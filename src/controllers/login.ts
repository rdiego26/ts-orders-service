import { Route, Tags, Post, Body } from 'tsoa';
import { getUserByEmail } from '../repositories/user';
import { generateAuthToken } from '../services/auth';
import { comparePassword } from '../utils/passwordHash';

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

@Route('api/login')
@Tags('Login')
export default class LoginController {
  /**
   * The returned token will be required to use on "authorization" header as bearer token.
   */
  @Post('/')
  public async login(@Body() body: ILoginPayload): Promise<ILoginResponse> {
    const userExists = await getUserByEmail(body.email);

    if (!userExists) {
      throw new Error('Unauthenticated');
    }

    const validPassword: boolean = comparePassword(body.password, userExists.password);
    if (!validPassword) {
      throw new Error('Unauthenticated');
    }

    return { token: generateAuthToken(userExists) };
  }
}
