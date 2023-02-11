import { Express, Request, Response } from 'express';
import { check }  from 'express-validator';
import { registerUser, authenticateUser, updateUser } from './controller/userController';

import { 
  createExpense,
  updateExpense,
  deleteExpense,
  getExpense,
  getExpenses, 
} from './controller/expenseController';

import { 
  createIncome,
  updateIncome,
  deleteIncome,
  getIncome,
  getIncomes, 
} from './controller/incomeController';

import authValidate from './controller/authValidateController';
import { sendMessage } from './controller/messageController';

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

  app.post('/api/expense', authValidate, createExpense);
  app.patch('/api/expense/:id', authValidate, updateExpense);
  app.delete('/api/expense/:id', authValidate, deleteExpense);
  app.get('/api/expense/:id', getExpense);
  app.get('/api/expense', authValidate, getExpenses);

  app.post('/api/income', authValidate, createIncome);
  app.patch('/api/income/:id', authValidate, updateIncome);
  app.delete('/api/income/:id', authValidate, deleteIncome);
  app.get('/api/income/:id', getIncome);
  app.get('/api/income', authValidate, getIncomes);

  app.post('/api/message', authValidate, sendMessage);
}

export default routes;
