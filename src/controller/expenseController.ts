import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Expense } from '../models/expensesModel';
import { IJwtToken } from './userController';

export async function createExpense(req: Request, res: Response) {
  try {
    const user = req.user as IJwtToken;
    const newExpense = await Expense.create({ 
      ...req.body,
      userId: user.id,
      _id: new mongoose.Types.ObjectId,
    });
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function updateExpense(req: Request, res: Response) {
  try {
    const expense = await Expense.findOneAndUpdate(
      { '_id': req.params.id },
      { $set: { ...req.body } },
      { returnDocument: 'after' });

    if (expense === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(expense);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function deleteExpense(req: Request, res: Response) {
  try {
    const expense = await Expense.findOneAndDelete({ '_id': req.params.id });

    if (expense === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ response: 'Expense deleted successfully' });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getExpense(req: Request, res: Response) {
  try {
    const expense = await Expense.findOne({ '_id': req.params.id });

    if (expense === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(expense);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getExpenses(req: Request, res: Response) {
  try {
    const userId = (req.user as IJwtToken).id;
    const expenses = await Expense.find({ 'userId': userId });

    if (expenses.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(expenses);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}