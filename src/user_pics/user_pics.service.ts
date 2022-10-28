import { Injectable } from '@nestjs/common';
import Database from '../database/controller/database';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

@Injectable()
export class UserPicsService {
  async uploadFile(file: Express.Multer.File, userId: string) {
    let string;
    await sharp(file.buffer)
      .resize({ width: 600, height: 848, fit: 'fill' })
      .toBuffer()
      .then((data) => {
        string = data.toString('base64');
      })
      .catch((err) => {
        console.log(err);
      });

    const ok = await Database.doQuery(
      `INSERT INTO user_pics (content, user_id) VALUES ('${string}', ${userId})`,
    );

    return ok;
  }

  async getDatabaseFileById(response: Response, id: string) {
    try {
      const file = await Database.doQuery(
        `SELECT content FROM user_pics WHERE id = ${id}`,
      );

      response.writeHead(200, { 'Content-Type': 'image/png' });
      response.end(Buffer.from(file[0].content, 'base64'));
    } catch (error) {
      console.log(error);
    }
  }

  async getUserFiles(id: string) {
    const files = await Database.doQuery(
      `SELECT id, user_id FROM user_pics WHERE user_id = ${id}`,
    );

    return files.map((file) => {
      return file.id;
    });
  }

  async deleteFile(id: string) {
    try {
      const ok = await Database.doQuery(
        `DELETE FROM user_pics WHERE id = ${id}`,
      );

      return ok;
    } catch {
      return false;
    }
  }
}
