import { Request, Response } from 'express';

import { Expense } from '../models/expensesModel';
import { IJwtToken } from './userController';

export async function createExpense(req: Request, res: Response) {
  try {
    const user = req.user as IJwtToken;
    const newExpense = await Expense.create({ 
      ...req.body,
      userId: user.id,
    });
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json(err);
  }
}
