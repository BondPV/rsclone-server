import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Expense } from '../models/expensesModel';
import { IJwtToken } from './userController';
import getFilter from '../utils/getFilter';
import { initDate } from '../../config/default';

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

    const fields = ['account', 'category', 'currency' ];
    const query = { 
      account: req.query.account as string,
      category: req.query.category as string,
      carrency: req.query.currency as string,
    };

    let startDate = initDate;
    let endDate = new Date();
    endDate.setHours(23, 59, 59);

    if (req.query.startDate && req.query.endDate) {
      startDate = new Date(Date.parse(req.query.startDate as string));
      endDate = new Date(Date.parse(req.query.endDate as string));
    }

    const filter = getFilter(query, fields);

    const sortParam = req.query.sort || 'date';
    const value = req.query.order ? (req.query.order === 'ASC' ? 1 : -1) : 1;

    const page = req.query.page ? +req.query.page : 0;
    const limit = req.query.limit ? +req.query.limit : 0;

    const expenses = await Expense
      .find(
        {
          'userId': userId,
          ...filter,
          'date': { 
            $gte: startDate,
            $lte: endDate, 
          },
        },
      )
      .sort({ [`${sortParam}`] : value })
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit);

    res.status(200).json(expenses);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}