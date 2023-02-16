import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Income } from '../models/incomeModel';
import { IJwtToken } from './userController';
import getFilter from '../utils/getFilter';
import { initDate } from '../../config/default';

export async function createIncome(req: Request, res: Response) {
  try {
    const user = req.user as IJwtToken;
    const newIncome = await Income.create({ 
      ...req.body,
      userId: user.id,
      _id: new mongoose.Types.ObjectId,
    });
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function updateIncome(req: Request, res: Response) {
  try {
    const income = await Income.findOneAndUpdate(
      { '_id': req.params.id },
      { $set: { ...req.body } },
      { returnDocument: 'after' });

    if (income === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(income);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function deleteIncome(req: Request, res: Response) {
  try {
    const income = await Income.findOneAndDelete({ '_id': req.params.id });

    if (income === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ response: 'Income deleted successfully' });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getIncome(req: Request, res: Response) {
  try {
    const income = await Income.findOne({ '_id': req.params.id });

    if (income === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(income);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getIncomes(req: Request, res: Response) {
  try {
    const userId = (req.user as IJwtToken).id;

    const fields = ['account', 'currency' ];
    const query = { 
      account: req.query.account as string,
      carrency: req.query.currency as string,
    };

    let startDate = initDate;
    let endDate = new Date();

    if (req.query.startDate && req.query.endDate) {
      startDate = new Date(Date.parse(req.query.startDate as string));
      endDate = new Date(Date.parse(req.query.endDate as string));
    }

    const filter = getFilter(query, fields);

    const incomes = await Income.find(
      {
        'userId': userId,
        ...filter,
        'date': { 
          $gte: startDate,
          $lte: endDate, 
        },
      },
    );

    if (incomes.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(incomes);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}