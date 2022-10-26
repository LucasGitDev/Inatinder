import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import JWTProvider, { JwtPayload } from '../providers/jwtProvider';

@Injectable()
export class AuthMiddleware implements CanActivate {
  constructor(private jwtProvider: JWTProvider) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];

      if (!authHeader) {
        throw new HttpException('Missing JWT token', 400);
      }

      const token = authHeader.split(' ')[1];
      const decoded = this.jwtProvider.decodeToken(token) as JwtPayload;

      if (!decoded) {
        throw new HttpException('Invalid JWT token', 400);
      }

      request.user = { id: decoded.user_id };

      return true;
    } catch (e) {
      if (e instanceof HttpException) {
        throw e;
      }

      throw new HttpException('Invalid JWT token', 400);
    }
  }
}
