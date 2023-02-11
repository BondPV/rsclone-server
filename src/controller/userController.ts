import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { bcryptSaltRounds, tokenSettings } from '../../config/default';
import { User } from '../models/usersModel';

export interface IUserPayload {
  id: string;
  username: string;
}

export interface IJwtToken extends IUserPayload {
  iat: number;
  exp: number;
}

interface IUserResponse {
  username: string;
  email: string;
  currency: string;
  avatar: string;
  phoneNumber: number | null;
}

export async function registerUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ message:'Registration error', errors });
    }

    const { email, username, password, currency } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(403).json({ message: `A user with ${email} already exists` });
    }

    const hashPassword = bcrypt.hashSync(password, bcryptSaltRounds);
    
    await User.create({
      _id: new mongoose.Types.ObjectId,
      email: email,
      username: username,
      password: hashPassword,
      currency: currency,
    });

    return res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Registration error' });
  }
}

export async function authenticateUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const userAuth = await User.findOne({ email });
    
    if (!userAuth) {
      return res.status(403).json({ message: `Email: ${email} not found` });
    }

    const validPassword = bcrypt.compareSync(password, userAuth.password);

    if (!validPassword) {
      return res.status(403).json({ message: 'Invalid password, please try again!' });
    }

    const payload: IUserPayload = { id: userAuth._id, username: userAuth.username };
    const token: string = jwt.sign(payload, tokenSettings.secretKey, { expiresIn: tokenSettings.time } );
    const user: IUserResponse = {
      username: userAuth.username,
      email: userAuth.email,
      currency: userAuth.currency,
      avatar: userAuth.avatar,
      phoneNumber: userAuth.phoneNumber,
    };

    return res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Login error' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = (req.user as IJwtToken).id;
    const userUpdate = await User.findOneAndUpdate(
      { '_id': userId },
      { $set: { ...req.body } },
      { returnDocument: 'after' });

    if (userUpdate === null) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      const user: IUserResponse = {
        username: userUpdate.username,
        email: userUpdate.email,
        currency: userUpdate.currency,
        avatar: userUpdate.avatar,
        phoneNumber: userUpdate.phoneNumber,
      };
      return res.status(200).json({ message: 'Successfully updated', user });
    }

  } catch (error) {
    if (await User.findOne( { email: req.body.email } )) {
      return res.status(403).json({ message: `A user with ${req.body.email} already exists` });
    }
    console.log(error);
    res.sendStatus(400);
  }
}
