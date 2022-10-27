import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/controller/database';

@Injectable()
export class UserLikesService {
  constructor(private readonly database: Database) {}

  async userLikes(id: string, liked: string) {
    const query = `INSERT INTO user_likes (user_id, liked_user) VALUES ('${id}', '${liked}')`;
    return await this.database.doQuery(query);
  }

  async getAllUserLikes(id: string) {
    const query = `SELECT liked_user FROM user_likes WHERE user_id = ${id}`;
    const res = await this.database.doQuery(query);

    return {
      userLikeUsers: res.map((user) => {
        return user.liked_user;
      }),
    };
  }

  async checkIfUserLiked(id: string, liked: string) {
    const query = `SELECT * FROM user_likes WHERE user_id = ${id} AND liked_user = ${liked}`;
    const res = await this.database.doQuery(query);
    return res.length > 0;
  }

  async getUsersNotLiked(id: string) {
    const query = `SELECT * FROM user WHERE id NOT IN (SELECT liked_user FROM user_likes WHERE user_id = ${id}) AND id != ${id}`;
    const res = await this.database.doQuery(query);
    return res;
  }
}
