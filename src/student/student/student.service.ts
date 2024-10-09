/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { StudentService as StudentValidationService } from 'src/validation/student/student.service';
import { v4 as uuid } from "uuid";
import { User } from '@prisma/client';

interface UserResponse {
    status: number;
    message: string;
    data?: User | User[];
}

@Injectable()
export class StudentService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly errorService: ErrorService,
        private readonly StudentValidationService: StudentValidationService
    ) {}

    async register(name: string, email: string, password: string, nim: string): Promise<UserResponse> {

        const requestRegister = this.StudentValidationService.register(name, email, password, nim);

        const userCount = await this.prismaService.user.count({
            where: {
                email: requestRegister.email
            }
        });

        if (userCount !== 0) {
            throw this.errorService.throwError(400, 'Email already exists');
        }

        requestRegister.password = await this.prismaService.hashPassword(requestRegister.password);

        const user = await this.prismaService.user.create({
            data: {
                name: requestRegister.name,
                email: requestRegister.email,
                password: requestRegister.password,
                role: 'STUDENT',
                student: {
                    create: {
                        nim: requestRegister.nim
                    }
                }
            }
        });

        return {
            status: 201,
            message: 'Student registered successfully',
            data: user
        };
    }

    async login(nim: string, password: string): Promise<UserResponse> {

        const requestLogin = this.StudentValidationService.login(nim, password);

        let user = await this.prismaService.user.findFirst({
            where: {
                student: {
                    nim: requestLogin.nim
                }
            }
        });
        
        if (!user) {
            throw this.errorService.throwError(400, 'NIM or password is wrong');
        };
        
        const isPasswordCorrect = await this.prismaService.comparePassword(requestLogin.password, user.password);
        
        if (!isPasswordCorrect) {
            throw this.errorService.throwError(400, 'NIM or password is wrong');
        };

        user = await this.prismaService.user.update({
            where: {
                id: user.id
            },
            data: {
                token: uuid()
            }
        });

        return {
            status: 200,
            message: 'Student logged in successfully',
            data: user
        };
    }

    async logout(user: User): Promise<UserResponse> {

        const student = await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: null,
            }
        });

        return {
            status: 200,
            message: 'Logout success',
            data: student
        }
    }

    async getStudents(): Promise<UserResponse> {

        const students = await this.prismaService.user.findMany({
            where: {
                role: 'STUDENT'
            },
            include: {
                student: true
            }
        });

        if (!students) {
            throw this.errorService.throwError(404, 'Students not found');
        };

        return {
            status: 200,
            message: 'Students retrieved successfully',
            data: students
        };
    }

    async update(user: User, name?: string, email?: string, password?: string): Promise<UserResponse> {

        const requestUpdate = this.StudentValidationService.update(name, email, password);

        if (requestUpdate.name) {
            user.name = requestUpdate.name;
        };

        if (requestUpdate.email) {
            user.email = requestUpdate.email;
        };

        if (requestUpdate.password) {
            user.password = await this.prismaService.hashPassword(requestUpdate.password);
        };

        const student = await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: requestUpdate,
        });

        return {
            status: 201,
            message: 'Student updated successfully',
            data: student
        };
    }

    async delete(id: number): Promise<UserResponse> {

        const student = await this.prismaService.user.deleteMany({
            where: {
                id: id
            }
        });

        if (!student) {
            throw this.errorService.throwError(404, "Student not found");
        };

        return {
            status: 201,
            message: "Success delete student",
        };
    }

    async getStudent(id: number): Promise<UserResponse> {

        const student = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
            include: {
                student: true,
            }
        });

        if (!student) {
            throw this.errorService.throwError(404, "Student not found");
        };

        return {
            status: 200,
            message: "Success get student",
            data: student
        };
    }

}
