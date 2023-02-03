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

export async function registerUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(403).json({ message:'Registration error', errors });
    }

    const { email, username, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(403).json({ message: `A user with ${email} already exists` });
    }

    const hashPassword = bcrypt.hashSync(password, bcryptSaltRounds);
    
    await User.create({
      email: email,
      username: username,
      password: hashPassword,
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
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(403).json({ message: `Email ${email} not found` });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(403).json({ message: 'Invalid password, please try again!' });
    }

    const payload: IUserPayload = { id: user._id, username: user.username };
    const token: string = jwt.sign(payload, tokenSettings.secretKey, { expiresIn: tokenSettings.time } );

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Login error' });
  }
}
