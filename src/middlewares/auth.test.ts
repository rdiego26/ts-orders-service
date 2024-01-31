import { StatusCodes } from 'http-status-codes';
import { createRequest, createResponse } from 'node-mocks-http';
import { authMiddleware } from './auth';
import * as AuthService from '../services/auth';
import { generateUserData } from '../utils/generateData';
import { describe, expect, test, jest, afterEach } from '@jest/globals';
import { User } from '../entities/users';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Auth Middleware', () => {
  describe('authMiddleware', () => {
    test('should be get UNAUTHORIZED for nonexistent token', async () => {
      const response = createResponse();
      const request = createRequest();
      const nextFn = jest.fn();
      authMiddleware(request, response, nextFn);

      expect(response._getStatusCode()).toEqual(StatusCodes.UNAUTHORIZED);
      expect(nextFn).toHaveBeenCalledTimes(0);
    });

    test('should be get UNAUTHORIZED for invalid token', async () => {
      const request = createRequest({
        headers: {
          authorization: '',
        },
      });
      const response = createResponse();
      const nextFn = jest.fn();
      authMiddleware(request, response, nextFn);

      expect(response._getStatusCode()).toEqual(StatusCodes.UNAUTHORIZED);
      expect(nextFn).toHaveBeenCalledTimes(0);
    });

    test('should be get call nextFunction for valid token', async () => {
      const userData: User = generateUserData();
      const token = 'validJWT';
      const header = `Bearer ${token}`;

      const spy = jest.spyOn(AuthService, 'verifyToken').mockReturnValueOnce(userData);
      const request = createRequest({
        headers: {
          authorization: header,
        },
      });
      const response = createResponse();
      const nextFn = jest.fn();
      authMiddleware(request, response, nextFn);

      expect(spy).toHaveBeenCalledWith(token);
      expect(nextFn).toHaveBeenCalledTimes(1);
    });
  });
});
