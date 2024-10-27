import { RecoveryMiddleware } from './recovery.middleware';

describe('RecoveryMiddleware', () => {
  it('should be defined', () => {
    expect(new RecoveryMiddleware()).toBeDefined();
  });
});
