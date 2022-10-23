import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Database } from './database/controller/database';
import { UserInfos } from './user_infos/entities/user_infos.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
