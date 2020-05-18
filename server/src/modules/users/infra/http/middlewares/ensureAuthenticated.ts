import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/Errors/AppError';

import UsersRepository from '../../typeorm/repositories/UsersRepository';

interface IPayload {
  sub: string;
  iat: number;
  exp: number;
}

async function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token not provided.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const usersRepository = new UsersRepository();

    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as IPayload;

    const isUserExists = await usersRepository.findById(sub);

    if (!isUserExists) {
      throw new Error();
    }

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}

export default ensureAuthenticated;
