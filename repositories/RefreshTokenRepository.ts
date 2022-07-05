import { errorHandler } from '~/lib/error';
import { Repository } from '~/repositories/index';
import { NullError } from '~/models/NullError';

export class RefreshTokenRepository implements Repository {
  get(): Promise<string> {
    const token = localStorage.getItem('refreshToken');

    if (token && token.length > 0) {
      return Promise.resolve(token);
    } else {
      errorHandler(RefreshTokenRepository);

      return Promise.reject(
        new NullError('RefreshTokenRepository: Token is empty'),
      );
    }
  }

  save(token: string): Promise<void> {
    if (token) {
      localStorage.setItem('refreshToken', token);

      return Promise.resolve(undefined);
    } else {
      errorHandler(RefreshTokenRepository);

      return Promise.reject(
        new NullError('RefreshTokenRepository: Token is empty'),
      );
    }
  }

  delete(): Promise<void> {
    localStorage.removeItem('refreshToken');

    return Promise.resolve(undefined);
  }

  // Реализация синглтона
  private static instance?: RefreshTokenRepository;
  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  private constructor() {}
  static getInstance(): RefreshTokenRepository {
    if (!RefreshTokenRepository.instance) {
      RefreshTokenRepository.instance = new RefreshTokenRepository();
    }

    return RefreshTokenRepository.instance;
  }
}
