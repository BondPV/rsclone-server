import { Express, Request, Response } from 'express';
import { check }  from 'express-validator';
import { registerUser, authenticateUser, updateUser, getUserCategoriesExpense } from './controller/userController';
import { createExpense, updateExpense, deleteExpense, getExpense, getExpenses } from './controller/expenseController';
import { createIncome, updateIncome, deleteIncome, getIncome, getIncomes } from './controller/incomeController';
import { createAccount, deleteAccount, getAccount, getAccounts, updateAccount, updateAccountSum } from './controller/accountController';
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from './controller/categoryController';
import { sendMessage } from './controller/messageController';

import authValidate from './controller/authValidateController';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/api/user/login', authenticateUser);

  app.post('/api/user/register', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('email', 'Email cannot be empty').isEmail(),
    check('password', 'Password must be at least 5 chars long').isLength({ min: 5 }),
  ], registerUser);

  app.patch('/api/user', authValidate, updateUser);
  app.get('/api/user/categoriesExpense', authValidate, getUserCategoriesExpense);

  // Expense routes
  app.post('/api/expense', authValidate, createExpense);
  app.patch('/api/expense/:id', authValidate, updateExpense);
  app.delete('/api/expense/:id', authValidate, deleteExpense);
  app.get('/api/expense/:id', getExpense);
  app.get('/api/expense', authValidate, getExpenses);

  // Income routes
  app.post('/api/income', authValidate, createIncome);
  app.patch('/api/income/:id', authValidate, updateIncome);
  app.delete('/api/income/:id', authValidate, deleteIncome);
  app.get('/api/income/:id', getIncome);
  app.get('/api/income', authValidate, getIncomes);

  // Account routes
  app.post('/api/account', authValidate, createAccount);
  app.patch('/api/account/:id', authValidate, updateAccount);
  app.patch('/api/account/:id/sum', authValidate, updateAccountSum);
  app.delete('/api/account/:id', authValidate, deleteAccount);
  app.get('/api/account/:id', getAccount);
  app.get('/api/account', authValidate, getAccounts);

  // Category routes
  app.post('/api/category', authValidate, createCategory);
  app.patch('/api/category/:id', authValidate, updateCategory);
  app.delete('/api/category/:id', authValidate, deleteCategory);
  app.get('/api/category/:id', getCategory);
  app.get('/api/category', authValidate, getCategories);

  // Messega routes
  app.post('/api/message', authValidate, sendMessage);
}

export default routes;
