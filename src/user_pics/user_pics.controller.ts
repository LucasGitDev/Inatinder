import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Response } from 'express';
import { AuthMiddleware } from 'src/middleware/auth';
import { UserPicsService } from './user_pics.service';

@Controller('user-pics')
export class UserPicsController {
  constructor(private readonly userPicsServices: UserPicsService) {}

  @UseGuards(AuthMiddleware)
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.userPicsServices.uploadFile(file, id);
  }

  @UseGuards(AuthMiddleware)
  @Get('show/:id')
  async getDatabaseFileById(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
  ) {
    return this.userPicsServices.getDatabaseFileById(response, id);
  }

  @UseGuards(AuthMiddleware)
  @Get(':id')
  async getUserFiles(@Param('id') id: string) {
    return this.userPicsServices.getUserFiles(id);
  }

  @UseGuards(AuthMiddleware)
  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    return this.userPicsServices.deleteFile(id);
  }
}
