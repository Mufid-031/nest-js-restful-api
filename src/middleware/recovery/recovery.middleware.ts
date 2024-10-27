/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

interface UserRequest extends Request {
  user: User;
}

@Injectable()
export class RecoveryMiddleware implements NestMiddleware {

  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async use(req: UserRequest, res: Response, next: () => void) {
   
    if (!req.path.startsWith('/api')) {
      return next();
    }

    if (req.path !== '/api/user/recovery') {
      return next();
    }

    const token = req.query.recoveryToken as string;

    if (token) {

      const user = await this.prismaService.user.findFirst({
        where: {
          recoveryToken: token
        }
      });

      if (user) {
        req.user = user;
        next();
        return;
      }
    }

    res.status(401).json({
      status: 401,
      message: 'Invalid token'
    });

  }
}
