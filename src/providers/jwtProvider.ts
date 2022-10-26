import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  user_id: string;
  iat: number;
  exp: number;
}

@Injectable()
export default class JWTProvider {
  generateToken(payload: string) {
    return jwt.sign({ user_id: payload }, process.env.SECRET_JWT, {
      expiresIn: '7d',
    });
  }

  decodeToken(token: string) {
    return jwt.verify(token, process.env.SECRET_JWT);
  }
}
