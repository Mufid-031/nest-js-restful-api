/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { TeacherService as TeacherValidationService } from 'src/validation/teacher/teacher.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { UserResponse } from 'src/types/user.type';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly TeacherValidationService: TeacherValidationService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    nip: string,
    gelar: string,
    keahlian: string,
  ): Promise<UserResponse> {
    const requestRegister = this.TeacherValidationService.register(
      name,
      email,
      password,
      nip,
      gelar,
      keahlian,
    );

    const userCount = await this.prismaService.user.count({
      where: {
        email: requestRegister.email,
      },
    });

    if (userCount !== 0) {
      throw new ErrorService(400, 'Email already exists');
    }

    requestRegister.password = await this.prismaService.hashPassword(
      requestRegister.password,
    );

    const user = await this.prismaService.user.create({
      data: {
        name: requestRegister.name,
        email: requestRegister.email,
        password: requestRegister.password,
        role: 'TEACHER',
        teacher: {
          create: {
            nip: requestRegister.nip,
            gelar: requestRegister.gelar,
            keahlian: requestRegister.keahlian,
          },
        },
      },
    });

    return {
      status: 201,
      message: 'User created successfully',
      data: user,
    };
  }

  async login(nip: string, password: string): Promise<UserResponse> {
    const requestLogin = this.TeacherValidationService.login(nip, password);

    let user = await this.prismaService.user.findFirst({
      where: {
        teacher: {
          nip: requestLogin.nip,
        },
      },
    });

    if (!user) {
      throw new ErrorService(400, 'NIP or password is wrong');
    }

    const isPasswordCorrect = await this.prismaService.comparePassword(
      requestLogin.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ErrorService(400, 'NIP or password is wrong');
    }

    user = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      status: 200,
      message: 'User logged in successfully',
      data: user,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    const teacher = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });

    return {
      status: 200,
      message: 'Logout success',
      data: teacher,
    };
  }

  async getTeachers(): Promise<UserResponse> {
    const teachers = await this.prismaService.user.findMany({
      where: {
        role: 'TEACHER',
      },
      include: {
        teacher: true,
      },
    });

    if (!teachers) {
      throw new ErrorService(404, 'Teachers not found');
    }

    return {
      status: 200,
      message: 'Teachers retrieved successfully',
      data: teachers,
    };
  }

  async update(
    user: User,
    name?: string,
    email?: string,
    password?: string,
    gelar?: string,
    keahlian?: string,
  ): Promise<UserResponse> {
    const requestUpdate = this.TeacherValidationService.update(
      name,
      email,
      password,
      gelar,
      keahlian,
    );

    if (requestUpdate.name) {
      user.name = requestUpdate.name;
    }

    if (requestUpdate.email) {
      user.email = requestUpdate.email;
    }

    if (requestUpdate.password) {
      user.password = await this.prismaService.hashPassword(
        requestUpdate.password,
      );
    }

    if (requestUpdate.gelar) {
      await this.prismaService.teacher.update({
        where: {
          userId: user.id,
        },
        data: {
          gelar: requestUpdate.gelar,
        },
      });
    }

    if (requestUpdate.keahlian) {
      await this.prismaService.teacher.update({
        where: {
          userId: user.id,
        },
        data: {
          keahlian: requestUpdate.keahlian,
        },
      });
    }

    const teacher = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: requestUpdate,
    });

    return {
      status: 201,
      message: 'User updated successfully',
      data: teacher,
    };
  }

  async delete(id: number): Promise<UserResponse> {
    const teacher = await this.prismaService.user.deleteMany({
      where: {
        id: Number(id),
      },
    });

    if (!teacher) {
      throw new ErrorService(404, 'Teacher not found');
    }

    return {
      status: 201,
      message: 'Success delete teacher',
    };
  }

  async getTeacher(user: User): Promise<UserResponse> {
    const teacher = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        teacher: true,
      },
    });

    if (!teacher) {
      throw new ErrorService(404, 'Teacher not found');
    }

    return {
      status: 200,
      message: 'Success get teacher',
      data: teacher,
    };
  }
}
