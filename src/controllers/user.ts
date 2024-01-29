import { Body, Post, Route, Tags } from 'tsoa';
import { createUser, ICreateUserPayload } from '../repositories/user';
import { DomainError } from '../utils/exceptions';
import { User } from '../entities/users';

@Route('api/users')
@Tags('User')
export default class UserController {
  @Post('/')
  public async createUser(@Body() body: ICreateUserPayload): Promise<User> {
    if (body.password !== body.confirmation) {
      throw new DomainError('Password do not match with confirmation!');
    }

    return createUser(body);
  }
}
