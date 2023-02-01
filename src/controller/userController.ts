import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { bcryptSaltRounds } from '../../config/default';
import { User } from '../models/usersModel';

export async function registerUser(req: Request, res: Response) {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(bcryptSaltRounds));

    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    return res.sendStatus(200);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return res.status(409).send(error.message);
  }
}