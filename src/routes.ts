import { Express, Request, Response } from 'express';
import { registerUser } from './controller/userController';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post('/register', registerUser);
}

export default routes;