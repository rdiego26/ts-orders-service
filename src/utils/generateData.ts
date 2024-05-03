import { randEmail, randFullName, randUuid, randPassword } from '@ngneat/falso';
import { User } from '../entities/users';

export function generateUserData(override = {}): User {
  return {
    id: randUuid(),
    fullName: randFullName(),
    email: randEmail(),
    password: randPassword(),
    createdAt: new Date(),
    ...override,
  };
}

export function generateUsersData(n = 1): User[] {
  return Array.from(
    {
      length: n,
    },
    () => {
      return generateUserData();
    },
  );
}
