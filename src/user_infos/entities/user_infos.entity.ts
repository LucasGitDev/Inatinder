import { Database } from '../../database/controller/database';
import { CreateUserInfosDto } from '../dtos/create-user-infos.dto';
import { UpdateUserInfosDto } from '../dtos/update-user-infos.dto';

export class UserInfos {
  id: number;
  course: string;
  period: string;
  hometown: string;
  biography: string;

  private static db = new Database();

  static fromJson(json: any) {
    const userInfos = new UserInfos();
    userInfos.id = json.id;
    userInfos.course = json.course;
    userInfos.period = json.period;
    userInfos.hometown = json.hometown;
    userInfos.biography = json.biography;

    return userInfos;
  }

  static async create(createUserInfosDto: CreateUserInfosDto) {
    const userInfos = new UserInfos();
    userInfos.course = createUserInfosDto.course;
    userInfos.period = createUserInfosDto.period;
    userInfos.hometown = createUserInfosDto.hometown || '';
    userInfos.biography = createUserInfosDto.biography || '';

    const query = `INSERT INTO user_infos (course, period, hometown, biography) VALUES ('${userInfos.course}', '${userInfos.period}', '${userInfos.hometown}', '${userInfos.biography}')`;

    await this.db.doQuery(query);

    return userInfos;
  }

  static async findById(id: number) {
    const result = await this.db.doQuery(
      `SELECT * FROM user_infos WHERE id = ${id}`,
    );
    return result[0];
  }

  static async findAll() {
    const result = await this.db.doQuery('SELECT * FROM user_infos');
    return result;
  }

  static async update(id: number, updateUserInfosDto: UpdateUserInfosDto) {
    const { course, period, hometown, biography } = updateUserInfosDto;
    const query = `UPDATE user_infos SET ${
      course ? 'course = "' + course + '",' : ''
    }${period ? ' period = "' + period + '",' : ''}${
      hometown ? ' hometown = "' + hometown + '",' : ''
    }${biography ? ' biography = "' + biography + '",' : ''}`;

    const result = await this.db.doQuery(
      query.slice(0, -1) + ` WHERE id = ${id}`,
    );
    return result;
  }

  static async delete(id: number) {
    const result = await this.db.doQuery(
      `DELETE FROM user_infos WHERE id = ${id}`,
    );
    return result;
  }
}
