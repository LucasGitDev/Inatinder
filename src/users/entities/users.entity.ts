import { HttpException, HttpStatus } from '@nestjs/common';
import { Database } from 'src/database/controller/database';
import BCryptHashProvider from 'src/providers/hashProvider';
import { UserInfos } from 'src/user_infos/entities/user_infos.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export class Users {
  id: number;
  name: string;
  email: string;
  password: string;
  userInfos?: UserInfos;

  private static db = new Database();

  static fromJson(json: any) {
    const user = new Users();
    user.id = json.id;
    user.name = json.name;
    user.email = json.email;
    user.password = json.password;
    user.userInfos = UserInfos.fromJson(json.userInfos);

    return user;
  }

  static async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new HttpException('EMAIL_ALREADY_IN_USE', HttpStatus.BAD_REQUEST);
    }

    if (createUserDto.userInfos) {
      const hasUserInfos = await UserInfos.haveUser(createUserDto.userInfos);
      if (hasUserInfos) {
        throw new HttpException(
          'USERINFOS_ALREADY_IN_USE',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    createUserDto.password = await new BCryptHashProvider().generate(
      createUserDto.password,
    );

    const { name, email, password, userInfos } = createUserDto;
    const query = `INSERT INTO user (name, email, password, user_infos_id) VALUES ('${name}', '${email}', '${password}', ${
      userInfos || null
    })`;

    const ret = await this.db.doQuery(query);
    return { id: ret.insertId, name, email, password, userInfos };
  }

  static async findAll() {
    // const result = await this.db.doQuery('SELECT * FROM user ');
    // select user and join user_infos if relation exists
    const result = await this.db.doQuery(
      'SELECT user.*, ui.course, ui.period, ui.hometown, ui.biography FROM user LEFT JOIN user_infos ui ON user.user_infos_id = ui.id order by user.id',
    );

    return result;
  }

  static async findById(id: number) {
    const result = await this.db.doQuery(
      `select user.*, ui.course, ui.period, ui.hometown, ui.biography FROM user LEFT JOIN user_infos ui ON user.user_infos_id = ui.id where user.id = ${id} ;`,
    );

    const userPics = await this.db.doQuery(
      `select id from user_pics where user_id = ${id} ;`,
    );
    return { ...result[0], pics: userPics.map((pic) => pic.id) };
  }

  static async findByEmail(email: string) {
    const result = await this.db.doQuery(
      `SELECT * FROM user WHERE email = '${email}'`,
    );
    return result[0];
  }

  static async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findByEmail(updateUserDto.email);
    if (user && user.id !== id) {
      throw new HttpException('EMAIL_ALREADY_IN_USE', HttpStatus.BAD_REQUEST);
    }

    // check if userInfos exists on another user
    const hasUserInfos = await UserInfos.haveUser(updateUserDto.userInfos);
    if (hasUserInfos) {
      throw new HttpException(
        'USERINFOS_ALREADY_IN_USE',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = await new BCryptHashProvider().generate(
        updateUserDto.password,
      );
    }

    const { name, email, password, userInfos } = updateUserDto;
    const query = `UPDATE user SET ${name ? 'name = "' + name + '",' : ''}${
      email ? ' email = "' + email + '",' : ''
    }${password ? ' password = "' + password + '",' : ''}${
      userInfos ? ' user_infos_id = ' + userInfos + ',' : ''
    }`;

    const result = await this.db.doQuery(
      query.slice(0, -1) + ` WHERE id = ${id}`,
    );
    return result;
  }

  static async delete(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const result = await this.db.doQuery(
      `DELETE FROM user_infos WHERE id = ${user.user_infos_id}`,
    );

    return result;
  }
}
