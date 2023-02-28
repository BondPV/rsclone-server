import { Request, Response,  NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tokenSettings } from '../../config/default';
import { IJwtToken } from './userController';

function authValidate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = (req.headers.authorization || '').split(' ')[1];
      
    if (!token) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    const decodedToken = jwt.verify(token, tokenSettings.secretKey) as IJwtToken ;
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Server error' });
  }
}

export default authValidate;
