import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class BCryptHashProvider {
  public async generate(payload: string): Promise<string> {
    return bcrypt.hash(payload, 10);
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
