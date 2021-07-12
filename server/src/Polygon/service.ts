import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Polygon } from './interface';
import * as data from '../db/test_data.json';

@Injectable()
export class PolygonService {
  private data: Polygon[];

  constructor() {
    this.data = data.data;
  }

  /**
   * get polygons menu with pagination
   * @param page number of page
   * @param itemsPerPage number of itemsPerPage
   */
  getPolygonsMenu = (page: number, itemsPerPage: number) => {
    try {
      const dataSlice = this.data.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage,
      );
      const polygons = [];
      for (const item of dataSlice) {
        polygons.push({ id: item.id, name: item.properties.reg_name });
      }
      return polygons;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  /**
   * get polygon by id
   * @param id of the required polygon
   */
  getPolygonById = (id: string) => {
    try {
      const polygon = this.data.filter((item: Polygon) => item.id === id)[0];
      return polygon;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  /**
   * search polygons by reg_name or zone
   * @param q search text
   */
  searchPolygons = (q: string) => {
    try {
      const regex = new RegExp(q, 'i');
      const polygons = [];
      for (const item of this.data) {
        const { reg_name, zone } = item.properties;
        if (reg_name.match(regex) || zone.match(regex)) {
          polygons.push(item);
        }
      }

      return polygons;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}
