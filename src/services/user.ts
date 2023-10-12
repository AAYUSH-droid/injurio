import { createHmac, randomBytes } from 'node:crypto';
// import JWT from 'jsonwebtoken';
import { prismaClient } from '../lib/db';

export interface CreateUserPayload {
  username: string;
  email: string;
  password: string;
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac('sha256', salt)
      .update(password)
      .digest('hex');
    return hashedPassword;
  }

  public static createUser(payload: CreateUserPayload) {
    const { username, email, password } = payload;

    const salt = randomBytes(32).toString('hex');
    const hashedPassword = UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  }
}

export default UserService;
