import { Module } from '@nestjs/common';
import { PolygonModule } from './Polygon/module';
import { HealthcheckController } from './Healthcheck/healthcheck.controller';

@Module({
  imports: [PolygonModule],
  controllers: [HealthcheckController],
})
export class AppModule {}
