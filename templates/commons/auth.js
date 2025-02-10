export const auth = `import bcrypt from 'bcryptjs';
import { env } from '../config';
import { sign, verify } from 'hono/jwt';

const SALT_FACTOR = 10;

type JwtPayload = {
  sub: string,
  exp: number | string
}

export class AuthModule {
  /**
   *
   * Hash Password
   *
   */
  static async hashPassword(plain: string) {
    const hashed = await bcrypt.hash(plain, SALT_FACTOR);
    return hashed;
  }

  /**
   *
   * Compare Password
   *
   */
  static async comparePassword(plain: string, hashed: string) {
    const isValid = await bcrypt.compare(plain, hashed);
    return isValid;
  }

  /**
   *
   * Sign JWT Token
   *
   */
  static async signToken(params: {
    sub: string;
    role: string;
    account: string;
  }) {
    const payload = {
      ...params,
      exp: Math.floor(Date.now() / 1000) + 1296000,
    };

    const token = await sign(payload, env.jwt_secret);
    return token;
  }

  /**
   *
   * Verify JWT Token
   *
   */
  static async verifyToken(token: string) {
    const payload = await verify(token, env.jwt_secret);
    return payload as JwtPayload;
  }
};
`;
