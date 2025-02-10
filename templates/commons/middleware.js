export const middleware = `import { AuthModule } from './auth';
import { Context, Next } from 'hono';
import { UnauthorizedException } from './exceptions';

export async function authenticator(c: Context, next: Next) {
  const token = c.req.header('Authorization');

  if (!token) {
    throw new UnauthorizedException('No token set in Authorization header');
  }

  try {
    const payload = await AuthModule.verifyToken(token);
    c.set('jwtPayload', payload);
    
    await next();
  } catch {
    throw new UnauthorizedException('Invlaid Token');
  }
}

`;
