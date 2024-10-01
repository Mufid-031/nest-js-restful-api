/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Header, HttpCode, Param, Post, Query } from '@nestjs/common';
// import { Request } from 'express';

@Controller('/api/users')
export class UserController {
    @Post()
    post(): string {
        return 'POST';
    }

    @Get('/sample')
    get(): string {
        return 'GET';
    }

    // @Get('/:id')
    // getById(@Req() request: Request): string {
    //     return `GET ${request.params.id}`;
    // }

    @Get('/query')
    getQuery(
        @Query('first_name') firstName: string,
        @Query('last_name') lastName: string
    ): string {
        return `GET query Hello ${firstName || 'Guest'} ${lastName || 'Guest'}`;
    }

    @Get('/param/:id')
    getParam(@Param('id') id: string): string {
        return `GET param ${id}`;
    }

    @Get('/body')
    getBody(
        @Body('name') name: string,
        @Body('age') age: number
    ): string {
        return `GET body ${name} ${age}`;
    }

    @Get('/json')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    getJson(): Record<string, string | number> {
        return {
            status: 200,
            message: 'OK',
            data: 'Hello json!'
        }
    }

}
