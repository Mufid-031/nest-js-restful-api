/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';
import { v4 as uuid } from "uuid";
import { User } from '@prisma/client';

interface UserResponse {
    status: number,
    message: string,
    data: User,
}

enum Role {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
}

@Injectable()
export class AdminService {
    constructor(
        private readonly validation: ValidationService,
        private readonly prismaService: PrismaService,
        private readonly errorService: ErrorService
    ) {}

    async register(name: string, email: string, password: string): Promise<UserResponse> {

        const schema = z.object({
            name: z.string().min(1).max(100),
            email: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        const requestRegister = this.validation.validate(schema, {
            name,
            email,
            password,
        });

        const userCount = await this.prismaService.user.count({
            where: {
                email: requestRegister.email
            }
        });

        if (userCount !== 0) {
            throw this.errorService.throwError(400,'Email already exists');
        };

        requestRegister.password = await this.prismaService.hashPassword(requestRegister.password);

        const user = await this.prismaService.user.create({
            data: {
                name: requestRegister.name,
                email: requestRegister.email,
                password: requestRegister.password,
                role: 'ADMIN',
            }
        });

        return {
            status: 201,
            message: 'Register success',
            data: user,
        };
    }

    async login(email: string, password: string): Promise<UserResponse> {

        const schema = z.object({
            email: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        const requestLogin = this.validation.validate(schema, {
            email,
            password,
        });

        let user = await this.prismaService.user.findUnique({
            where: {
                email: requestLogin.email
            }
        });

        if (!user) {
            throw this.errorService.throwError(404, 'Email or password is wrong');
        };

        const isPasswordCorrect = await this.prismaService.comparePassword(requestLogin.password, user.password);

        if (!isPasswordCorrect) {
            throw this.errorService.throwError(404, 'Email or password is wrong');
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
            message: 'Login success',
            data: user
        };
    }

    async logout(user: User): Promise<UserResponse> {

        const admin = await this.prismaService.user.update({
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
            data: admin
        };
    }

    async update(user: User, name?: string, email?: string, password?: string): Promise<UserResponse> {

        const schema = z.object({
            name: z.string().min(1).max(100).optional(),
            email: z.string().min(1).max(100).optional(),
            password: z.string().min(1).max(100).optional(),
        });

        const requestUpdate = this.validation.validate(schema, {
            name,
            email,
            password,
        });

        if (requestUpdate.name) {
            user.name = requestUpdate.name;
        };

        if (requestUpdate.email) {
            user.email = requestUpdate.email;
        };

        if (requestUpdate.password) {
            user.password = await this.prismaService.hashPassword(requestUpdate.password);
        };

        const admin = await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: requestUpdate
        });

        return {
            status: 201,
            message: 'Update success',
            data: admin
        }
    }

    async updateUser(id: number, role: Role, name?: string, email?: string, password?: string): Promise<UserResponse> {
        
        const schema = z.object({
            id: z.number().min(1),
            role: z.enum([Role.ADMIN, Role.TEACHER, Role.STUDENT]),
            name: z.string().min(1).max(100).optional(),
            email: z.string().min(1).max(100).optional(),
            password: z.string().min(1).max(100).optional(),
        });

        const requestUpdate = this.validation.validate(schema, {
            id,
            role,
            name,
            email,
            password,
        });

        if (requestUpdate.role === Role.TEACHER) {
            
            const teacher = await this.prismaService.user.findUnique({
                where: {
                    id: requestUpdate.id,
                }
            });

            if (!teacher) {
                throw this.errorService.throwError(404, "Teacher not found");
            };

            if (requestUpdate.name) {
                teacher.name = requestUpdate.name;
            };

            if (requestUpdate.email) {
                teacher.email = requestUpdate.email;
            };

            if (requestUpdate.password) {
                teacher.password = await this.prismaService.hashPassword(requestUpdate.password);
            };

            const teacherUpdate = await this.prismaService.user.update({
                where: {
                    id: requestUpdate.id,
                },
                data: teacher
            });

            return {
                status: 201,
                message: "Success update teacher",
                data: teacherUpdate
            };
        }
    }
}
