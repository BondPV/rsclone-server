import { Express, Request, Response } from 'express';
import { check }  from 'express-validator';
import { registerUser, authenticateUser, updateUser } from './controller/userController';
import { createExpense } from './controller/expenseController';
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

  app.post('/api/expense', authValidate, createExpense);

}

export default routes;
