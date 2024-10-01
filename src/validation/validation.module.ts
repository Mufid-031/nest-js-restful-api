/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation/validation.service';

@Module({})
export class ValidationModule {
  static forRoot(): DynamicModule {
    return {
      module: ValidationModule,
      global: true,
      providers: [ValidationService],
      exports: [ValidationService],
    };
  }
}
