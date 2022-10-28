import { Module } from '@nestjs/common';
import JWTProvider from 'src/providers/jwtProvider';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService, JWTProvider],
})
export class PlacesModule {}
