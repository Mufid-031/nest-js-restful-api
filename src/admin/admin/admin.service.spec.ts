/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {

  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be register admin', async () => {
    const name = 'admin';
    const email = 'admin';
    const password = 'admin';
    const result = await service.register(name, email, password);
    expect(result).toBe({
      id: expect.any(String),
      name,
      email,
      password: expect.any(String),
    });
  });

});
