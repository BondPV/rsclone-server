import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Category } from '../models/categoryModel';
import { IJwtToken } from './userController';

export async function createCategory(req: Request, res: Response) {
  try {
    const user = req.user as IJwtToken;
    const newCategory = await Category.create({ 
      ...req.body,
      userId: user.id,
      _id: new mongoose.Types.ObjectId,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await Category.findOneAndUpdate(
      { '_id': req.params.id },
      { $set: { ...req.body } },
      { returnDocument: 'after' });

    if (category === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const category = await Category.findOneAndDelete({ '_id': req.params.id });

    if (category === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json({ response: 'Category deleted successfully' });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const category = await Category.findOne({ '_id': req.params.id });

    if (category === null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}

export async function getCategories(req: Request, res: Response) {
  try {
    const userId = (req.user as IJwtToken).id;
    const categories = await Category.find({ 'userId': userId });

    if (categories.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(categories);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}