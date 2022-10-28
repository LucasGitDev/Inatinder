import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Database from '../database/controller/database';
import { CreatePlacesDto, UpdatePlacesDto } from './dtos/places.dto';

@Injectable()
export class PlacesService {
  async createPlace(place: CreatePlacesDto) {
    // check if place already exists
    const query = `SELECT * FROM places WHERE name = "${place.name}"`;
    const res = await Database.doQuery(query);
    if (res.length > 0) {
      return res;
    }

    const query2 = `INSERT INTO places (name, type) VALUES ('${place.name}', '${place.type}' )`;
    return await Database.doQuery(query2);
  }

  async getAllPlaces() {
    const query = `SELECT * FROM places`;
    return await Database.doQuery(query);
  }

  async getPlaceById(id: number) {
    const query = `SELECT * FROM places WHERE id = ${id}`;
    const res = await Database.doQuery(query);
    return res[0];
  }

  async getPlacesByType(type: string) {
    const query = `SELECT * FROM places WHERE type = ${type}`;
    const res = await Database.doQuery(query);
    return res;
  }

  async updatePlace(id: number, place: UpdatePlacesDto) {
    //check if name already exists
    const has = `SELECT * FROM places WHERE name = "${place.name}"`;
    const hasRes = await Database.doQuery(has);
    if (hasRes.length > 0)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const query = `UPDATE places SET ${
      place.name ? 'name = "' + place.name + '",' : ''
    }${place.type ? ' type = "' + place.type + '",' : ''}`;
    const res = await Database.doQuery(
      query.slice(0, -1) + ` WHERE id = ${id}`,
    );
    return res;
  }

  async deletePlace(id: number) {
    const query = `DELETE FROM places WHERE id = ${id}`;
    const res = await Database.doQuery(query);
    return res;
  }

  async getPlacesByUserId(id: number) {
    const query = `SELECT * FROM places WHERE user_id = ${id}`;
    const res = await Database.doQuery(query);
    return res;
  }
}
