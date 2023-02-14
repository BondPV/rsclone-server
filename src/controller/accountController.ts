import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Account } from '../models/accountModel';
import { IJwtToken } from './userController';

export async function createAccount(req: Request, res: Response) {
  try {
    const user = req.user as IJwtToken;
    const newAccount = await Account.create({ 
      ...req.body,
      userId: user.id,
      _id: new mongoose.Types.ObjectId,
    });
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function updateAccount(req: Request, res: Response) {
  try {
    const account = await Account.findOneAndUpdate(
      { '_id': req.params.id },
      { $set: { ...req.body } },
      { returnDocument: 'after' });

    if (account === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(account);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const account = await Account.findOneAndDelete({ '_id': req.params.id });

    if (account === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ response: 'Account deleted successfully' });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getAccount(req: Request, res: Response) {
  try {
    const account = await Account.findOne({ '_id': req.params.id });

    if (account === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(account);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getAccounts(req: Request, res: Response) {
  try {
    const userId = (req.user as IJwtToken).id;
    const accounts = await Account.find({ 'userId': userId });

    if (accounts.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(accounts);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}