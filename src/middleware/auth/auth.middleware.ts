/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

interface UserRequest extends Request {
  user: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}

  async use(req: UserRequest, res: Response, next: () => void) {
    const excludeRoutes = [
      '/api/admin/register',
      '/api/admin/login',
      '/api/student/register',
      '/api/student/login',
      '/api/teacher/register',
      '/api/teacher/login',
      '/api/users/param/:id',
      '/api/auth/signup',
      '/api/auth/recovery',
    ];

    if (!req.path.startsWith('/api')) {
      return next();
    }

    if (excludeRoutes.includes(req.path)) {
      return next();
    }

    const token = req.get('X-API-TOKEN');

    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          token: token,
        },
      });

      if (user) {
        req.user = user;
        next();
        return;
      }
    }

    res
      .status(401)
      .json({
        errors: 'Unauthorized',
      })
      .end();
  }
}
