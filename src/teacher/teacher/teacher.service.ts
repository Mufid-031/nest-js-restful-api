/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ErrorService } from 'src/error/error/error.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { z } from 'zod';
import { v4 as uuid } from "uuid";
import { User } from '@prisma/client';

interface UserResponse {
    status: number;
    message: string;
    data: User | User[];
}

@Injectable()
export class TeacherService {
    constructor(
        private readonly validation: ValidationService,
        private readonly prismaService: PrismaService,
        private readonly errorService: ErrorService,
    ) {}

    async register(name: string, email: string, password: string, nip: string): Promise<UserResponse> {

        const schema = z.object({
            name: z.string().min(1).max(100),
            email: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
            nip: z.string().min(1).max(100),
        });

        const requestRegister = this.validation.validate(schema, {
            name,
            email,
            password,
            nip
        });

        const userCount = await this.prismaService.user.count({
            where: {
                email: requestRegister.email
            }
        });

        if (userCount !== 0) {
            throw this.errorService.throwError(400, 'Email already exists');
        };

        requestRegister.password = await this.prismaService.hashPassword(requestRegister.password);

        const user = await this.prismaService.user.create({
            data: {
                name: requestRegister.name,
                email: requestRegister.email,
                password: requestRegister.password,
                role: 'TEACHER',
                teacher: {
                    create: {
                        nip: requestRegister.nip
                    }
                }
            }
        });

        return {
            status: 201,
            message: 'User created successfully',
            data: user
        };
    }

    async login(nip: string, password: string): Promise<UserResponse> {

        const schema = z.object({
            nip: z.string().min(1).max(100),
            password: z.string().min(1).max(100),
        });

        const requestLogin = this.validation.validate(schema, {
            nip,
            password
        });

        let user = await this.prismaService.user.findFirst({
            where: {
                teacher: {
                    nip: requestLogin.nip
                }
            }
        });

        if (!user) {
            throw this.errorService.throwError(400, 'NIP or password is wrong');
        };

        const isPasswordCorrect = await this.prismaService.comparePassword(requestLogin.password, user.password);

        if (!isPasswordCorrect) {
            throw this.errorService.throwError(400, 'NIP or password is wrong');
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
            message: 'User logged in successfully',
            data: user
        };
    }

    async logout(user: User): Promise<UserResponse> {

        const teacher = await this.prismaService.user.update({
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
            data: teacher
        }
    }

    async getTeachers(): Promise<UserResponse> {

        const teachers = await this.prismaService.user.findMany({
            where: {
                role: 'TEACHER',
            }
        });

        if (!teachers) {
            throw this.errorService.throwError(404, 'Teachers not found');
        };

        return {
            status: 200,
            message: 'Teachers retrieved successfully',
            data: teachers
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
            password
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

        const teacher = await this.prismaService.user.update({
            where: {
                id: user.id,
            },
            data: requestUpdate,
        });

        return {
            status: 201,
            message: 'User updated successfully',
            data: teacher
        };
    }
}
