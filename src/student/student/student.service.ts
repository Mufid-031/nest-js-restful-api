/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { StudentService as StudentValidationService } from 'src/validation/student/student.service';
import { v4 as uuid } from 'uuid';
import { User } from '@prisma/client';
import { UserResponse } from 'src/types/user.type';

@Injectable()
export class StudentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly errorService: ErrorService,
    private readonly StudentValidationService: StudentValidationService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    nim: string,
    programStudi: string
  ): Promise<UserResponse> {
    const requestRegister = this.StudentValidationService.register(
      name,
      email,
      password,
      nim,
      programStudi
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
        role: 'STUDENT',
        student: {
          create: {
            nim: requestRegister.nim,
            programStudi: requestRegister.programStudi,
            statusStudent: 'ACTIVE'
          },
        },
      },
    });

    return {
      status: 201,
      message: 'Student registered successfully',
      data: user,
    };
  }

  async login(nim: string, password: string): Promise<UserResponse> {
    const requestLogin = this.StudentValidationService.login(nim, password);

    let user = await this.prismaService.user.findFirst({
      where: {
        student: {
          nim: requestLogin.nim,
        },
      },
    });

    if (!user) {
      throw new ErrorService(400, 'NIM or password is wrong');
    }

    const isPasswordCorrect = await this.prismaService.comparePassword(
      requestLogin.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ErrorService(400, 'NIM or password is wrong');
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
      message: 'Student logged in successfully',
      data: user,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    const student = await this.prismaService.user.update({
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
      data: student,
    };
  }

  async getStudents(): Promise<UserResponse> {
    const students = await this.prismaService.user.findMany({
      where: {
        role: 'STUDENT',
      },
      include: {
        student: true,
      },
    });

    if (students.length === 0) {
      throw new ErrorService(404, 'Students not found');
    }

    return {
      status: 200,
      message: 'Students retrieved successfully',
      data: students,
    };
  }

  async update(
    user: User,
    name?: string,
    email?: string,
    password?: string,
    telephone?: string,
    tanggalLahir?: Date
  ): Promise<UserResponse> {
    const requestUpdate = this.StudentValidationService.update(
      name,
      email,
      password,
      telephone,
      tanggalLahir
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

    if (requestUpdate.telephone) {
      user.telephone = requestUpdate.telephone;
    }

    if (requestUpdate.tanggalLahir) {
      user.tanggalLahir = requestUpdate.tanggalLahir;
    }

    const student = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: requestUpdate,
    });

    return {
      status: 201,
      message: 'Student updated successfully',
      data: student,
    };
  }

  async delete(id: number): Promise<UserResponse> {
    const { count } = await this.prismaService.user.deleteMany({
      where: {
        id: id,
      },
    });

    if (count === 0) {
      throw new ErrorService(404, 'Student not found');
    }

    return {
      status: 201,
      message: 'Success delete student',
    };
  }

  async getStudent(user: User): Promise<UserResponse> {
    const student = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        student: true,
      },
    });

    if (!student) {
      throw new ErrorService(404, 'Student not found');
    }

    return {
      status: 200,
      message: 'Success get student',
      data: student,
    };
  }
}
