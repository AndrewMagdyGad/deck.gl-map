import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PolygonService } from './service';
import { getPolygonsMenuSchema, searchSchema } from './validators';

@Controller('polygon')
export class PolygonController {
  constructor(private readonly polygonService: PolygonService) {}

  @Get('get-menu')
  getPolygonsMenu(@Req() req: Request) {
    const { error } = getPolygonsMenuSchema.validate(req.query);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } else {
      let { page, itemsPerPage } = req.query;
      const formattedPage = page ? Number(page) : 0;
      const formattedItemsPerPage = itemsPerPage ? Number(itemsPerPage) : 20;
      return this.polygonService.getPolygonsMenu(
        formattedPage,
        formattedItemsPerPage,
      );
    }
  }

  @Get(':id')
  getPolygonById(@Req() req: Request) {
    if (req.params.id === undefined) {
      throw new HttpException('provide a valid id', HttpStatus.BAD_REQUEST);
    } else {
      return this.polygonService.getPolygonById(req.params.id);
    }
  }

  @Get()
  searchPolygons(@Req() req: Request) {
    const { error } = searchSchema.validate(req.query);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } else {
      const { q } = req.query;
      return this.polygonService.searchPolygons(String(q));
    }
  }
}
