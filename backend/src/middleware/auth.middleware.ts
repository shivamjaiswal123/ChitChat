import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({
        message: 'Unauthorized request',
      });
      return;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.id = decode.id;
    next();
  } catch (error) {
    res.status(401).send('Token verification failed');
  }
};
