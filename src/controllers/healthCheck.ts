import { Get, Route, Tags } from 'tsoa';
import * as process from 'process';
import { Constants } from '../utils/constants';

export interface HealthCheckResponse {
  name: string;
  version: string;
  environment: string;
}

@Route('/healthCheck')
@Tags('Health Check')
export default class HealthCheckController {
  @Get('/')
  /**
   * Retrieve information about app and makes sure that stills health
   */
  public async getData(): Promise<HealthCheckResponse> {
    const { name, version } = Constants.app;

    return {
      name,
      version,
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
