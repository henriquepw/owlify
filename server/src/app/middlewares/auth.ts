import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';

import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

interface IPayload {
  id: string;
  iat: number;
  exp: number;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = (await promisify(jwt.verify)(
      token,
      authConfig.secret,
    )) as IPayload;

    /**
     * Check if user not exists
     */
    const isExists = await User.findByPk(decoded.id);

    if (!isExists) {
      throw new Error();
    }

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
