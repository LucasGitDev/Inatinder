import { HttpException, HttpStatus } from '@nestjs/common';
import Database from '../../database/controller/database';
import { Places } from '../../places/entities/place.entity';
import BCryptHashProvider from '../../providers/hashProvider';
import { UserInfos } from '../../user_infos/entities/user_infos.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export class Users {
  id: number;
  name: string;
  email: string;
  password: string;
  userInfos?: UserInfos;
  places?: Places[];

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

    const ret = await Database.doQuery(query);
    return { id: ret.insertId, name, email, password, userInfos };
  }

  static async findAll() {
    const result = await Database.doQuery(
      'SELECT user.*, ui.course, ui.period, ui.hometown, ui.biography FROM user LEFT JOIN user_infos ui ON user.user_infos_id = ui.id order by user.id',
    );

    return result;
  }

  static async findById(id: number) {
    const result = await Database.doQuery(
      `select user.*, ui.course, ui.period, ui.hometown, ui.biography FROM user LEFT JOIN user_infos ui ON user.user_infos_id = ui.id where user.id = ${id} ;`,
    );

    const userPics = await Database.doQuery(
      `select id from user_pics where user_id = ${id} ;`,
    );

    const userPlaces = await Places.findByUserId(id);
    return {
      ...result[0],
      pics: userPics.map((pic) => pic.id),
      places: userPlaces,
    };
  }

  static async findByEmail(email: string) {
    const result = await Database.doQuery(
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

    const result = await Database.doQuery(
      query.slice(0, -1) + ` WHERE id = ${id}`,
    );
    return result;
  }

  static async delete(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const result = await Database.doQuery(
      `DELETE FROM user_infos WHERE id = ${user.user_infos_id}`,
    );

    return result;
  }

  static async addPlace(userId: string, placeId: string) {
    const user = await this.findById(Number(userId));
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const place = await Places.findById(Number(placeId));
    if (!place) {
      throw new HttpException('PLACE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    // check if user already have this place
    const userPlaces = await Database.doQuery(
      `SELECT * FROM user_frequent_places WHERE user_id = ${userId} AND places_id = ${placeId}`,
    );
    if (userPlaces.length > 0) {
      throw new HttpException(
        'USER_ALREADY_HAVE_THIS_PLACE',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await Database.doQuery(
      `INSERT INTO inatinder_dev.user_frequent_places (user_id, places_id) VALUES('${userId}', '${placeId}')`,
    );

    return result;
  }
}
