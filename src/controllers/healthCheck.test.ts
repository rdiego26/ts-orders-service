import HealthCheckController from './healthCheck';
import { Constants } from '../utils/constants';
import { describe, expect, test } from '@jest/globals';

describe('HealthCheckController', () => {
  test('should return health check message', async () => {
    const controller = new HealthCheckController();
    const response = await controller.getData();

    expect(response.name).toBe(Constants.app.name);
    expect(response.version).toBe(Constants.app.version);
  });
});
