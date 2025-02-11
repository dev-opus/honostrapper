export const exceptions = `import type { ZodIssue } from 'zod';
import { HTTPException } from 'hono/http-exception';

export class BadRequestException extends HTTPException {
  constructor(message?:string) {
    super(400, {message: message || 'Bad Request'});
  }
}

export class UnauthorizedException extends HTTPException {
  constructor(message?: string) {
    super(401, {message: message || 'Unauthorized'});
  }
}

export class ForbiddenException extends HTTPException {
  constructor(message?: string) {
    super(403, {message: message || 'Forbidden'});
  }
}

export class NotFoundException extends HTTPException {  
  constructor(message?: string) {
    super(404, {message: message || 'Not Found'});
  }
}

export class MalformedEntityException extends HTTPException { 
  constructor(casue: ZodIssue[], message?: string) {
    super(422, {message: message || 'Malformed Entity', cause: formatZodIssues(casue)});
  }
}

function formatZodIssues(issues:ZodIssue[]) {
  return issues.map(issue => {
    return { path: issue.path.join(':'), message: issue.message };
  });
}

`;
