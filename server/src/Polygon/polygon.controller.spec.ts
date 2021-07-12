import { Test, TestingModule } from '@nestjs/testing';
import { PolygonController } from './controller';
import { PolygonService } from './service';
import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('PolygonController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [PolygonController],
      providers: [PolygonService],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  it('GET Polygons Menu with pagination', async () => {
    return request(app.getHttpServer())
      .get('/polygon/get-menu?page=1&itemsPerPage=10')
      .expect(HttpStatus.OK);
  });

  it('invalid query params, should throw error', async () => {
    return request(app.getHttpServer())
      .get('/polygon?q= ')
      .expect(HttpStatus.BAD_REQUEST);
  });
});
