import { Module } from '@nestjs/common';
import { PolygonController } from './controller';
import { PolygonService } from './service';

@Module({
  imports: [],
  controllers: [PolygonController],
  providers: [PolygonService],
})
export class PolygonModule {}
