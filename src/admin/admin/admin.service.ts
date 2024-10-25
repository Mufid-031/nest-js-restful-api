/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { AdminService as AdminValidationService } from 'src/validation/admin/admin.service';

interface UserResponse {
  status: number;
  message: string;
  data: User | User[];
}

enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly AdminValidationService: AdminValidationService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<UserResponse> {
    const requestRegister = this.AdminValidationService.register(
      name,
      email,
      password,
    );

    const userCount = await this.prismaService.user.count({
      where: {
        email: requestRegister.email,
      },
    });

    if (userCount !== 0) {
      throw this.errorService.throwError(400, 'Email already exists');
    }

    requestRegister.password = await this.prismaService.hashPassword(
      requestRegister.password,
    );

    const user = await this.prismaService.user.create({
      data: {
        name: requestRegister.name,
        email: requestRegister.email,
        password: requestRegister.password,
        role: 'ADMIN',
        Admin: {
          create: {},
        },
      },
    });

    return {
      status: 201,
      message: 'Register success',
      data: user,
    };
  }

  async login(email: string, password: string): Promise<UserResponse> {
    const requestLogin = this.AdminValidationService.login(email, password);

    let user = await this.prismaService.user.findUnique({
      where: {
        email: requestLogin.email,
      },
    });

    if (!user) {
      throw this.errorService.throwError(404, 'Email or password is wrong');
    }

    const isPasswordCorrect = await this.prismaService.comparePassword(
      requestLogin.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw this.errorService.throwError(404, 'Email or password is wrong');
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
      message: 'Login success',
      data: user,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    const admin = await this.prismaService.user.update({
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
      data: admin,
    };
  }

  async update(
    user: User,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<UserResponse> {
    const requestUpdate = this.AdminValidationService.update(
      name,
      email,
      password,
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

    const admin = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: requestUpdate,
    });

    return {
      status: 201,
      message: 'Update success',
      data: admin,
    };
  }

  async updateUser(
    id: number,
    role: Role,
    name?: string,
    email?: string,
    password?: string,
  ): Promise<UserResponse> {
    const requestUpdate = this.AdminValidationService.updateUser(
      id,
      role,
      name,
      email,
      password,
    );

    if (requestUpdate.role === Role.TEACHER) {
      const teacher = await this.prismaService.user.findUnique({
        where: {
          id: requestUpdate.id,
        },
      });

      if (!teacher) {
        throw this.errorService.throwError(404, 'Teacher not found');
      }

      if (requestUpdate.name) {
        teacher.name = requestUpdate.name;
      }

      if (requestUpdate.email) {
        teacher.email = requestUpdate.email;
      }

      if (requestUpdate.password) {
        teacher.password = await this.prismaService.hashPassword(
          requestUpdate.password,
        );
      }

      const teacherUpdate = await this.prismaService.user.update({
        where: {
          id: requestUpdate.id,
        },
        data: teacher,
      });

      return {
        status: 201,
        message: 'Success update teacher',
        data: teacherUpdate,
      };
    } else if (requestUpdate.role === Role.STUDENT) {
      const student = await this.prismaService.user.findUnique({
        where: {
          id: requestUpdate.id,
        },
      });

      if (!student) {
        throw this.errorService.throwError(404, 'Student not found');
      }

      if (requestUpdate.name) {
        student.name = requestUpdate.name;
      }

      if (requestUpdate.email) {
        student.email = requestUpdate.email;
      }

      if (requestUpdate.password) {
        student.password = await this.prismaService.hashPassword(
          requestUpdate.password,
        );
      }

      const studentUpdate = await this.prismaService.user.update({
        where: {
          id: requestUpdate.id,
        },
        data: student,
      });

      return {
        status: 201,
        message: 'Success update student',
        data: studentUpdate,
      };
    }
  }

  async deleteUser(id: number, role: Role): Promise<UserResponse> {
    const user = await this.prismaService.user.delete({
      where: {
        id: id,
        role: role,
      },
    });

    if (!user) {
      throw this.errorService.throwError(404, 'User not found');
    }

    return {
      status: 201,
      message: 'Success delete user',
      data: user,
    };
  }

  async getStudentByName(name: string): Promise<UserResponse> {
    const student = await this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
        },
        role: 'STUDENT',
      },
    });

    if (!student) {
      throw this.errorService.throwError(404, 'Student not found');
    }

    return {
      status: 200,
      message: 'Success get student',
      data: student,
    };
  }

  async getTeacherByName(name: string): Promise<UserResponse> {
    const teacher = await this.prismaService.user.findMany({
      where: {
        name: {
          contains: name,
        },
        role: 'TEACHER',
      },
    });

    if (!teacher) {
      throw this.errorService.throwError(404, 'Teacher not found');
    }

    return {
      status: 200,
      message: 'Success get teacher',
      data: teacher,
    };
  }

  async getStudent(id: number): Promise<UserResponse> {
    const student = await this.prismaService.user.findUnique({
      where: {
        id: id,
        role: 'STUDENT',
      },
      include: {
        student: true,
      },
    });

    if (!student) {
      throw this.errorService.throwError(404, 'Student not found');
    }

    return {
      status: 200,
      message: 'Success get student',
      data: student,
    };
  }

  async getTeacher(id: number): Promise<UserResponse> {
    const teacher = await this.prismaService.user.findUnique({
      where: {
        id: id,
        role: 'TEACHER',
      },
      include: {
        teacher: true,
      },
    });

    if (!teacher) {
      throw this.errorService.throwError(404, 'Teacher not found');
    }

    return {
      status: 200,
      message: 'Success get teacher',
      data: teacher,
    };
  }
}
