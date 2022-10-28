import database from '../../database/controller/database';
import { Users } from '../../users/entities/users.entity';
import { CreatePlacesDto, UpdatePlacesDto } from '../dtos/places.dto';

export class Places {
  id: number;
  name: string;
  type: string;
  users?: Users[];

  static fromJson(json: any) {
    const place = new Places();
    place.id = json.id;
    place.name = json.name;
    place.type = json.type;

    return place;
  }

  static async findAll() {
    const result = await database.doQuery('SELECT * FROM places');
    return result.map((place) => this.fromJson(place));
  }

  static async findById(id: number) {
    const result = await database.doQuery(
      `SELECT * FROM places WHERE id = '${id}'`,
    );
    return result[0];
  }

  static async findByType(type: string) {
    const result = await database.doQuery(
      `SELECT * FROM places WHERE type = '${type}'`,
    );
    return result.map((place) => this.fromJson(place));
  }

  static async create(createPlaceDto: CreatePlacesDto) {
    const { name, type } = createPlaceDto;
    const query = `INSERT INTO places (name, type) VALUES ('${name}', '${type}')`;
    const ret = await database.doQuery(query);
    return { id: ret.insertId, name, type };
  }

  static async update(id: number, updatePlaceDto: UpdatePlacesDto) {
    const { name, type } = updatePlaceDto;
    const query = `UPDATE places SET name = '${name}', type = '${type}' WHERE id = ${id}`;
    await database.doQuery(query);
    return { id, name, type };
  }

  static async delete(id: number) {
    const query = `DELETE FROM places WHERE id = ${id}`;
    await database.doQuery(query);
    return { id };
  }

  static async findByUserId(id: number) {
    const result = await database.doQuery(
      `SELECT places_id FROM user_frequent_places WHERE user_id = '${id}'`,
    );

    return result.map((place) => place.places_id);
  }
}
