import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthMiddleware } from 'src/middleware/auth';
import { CreatePlacesDto, UpdatePlacesDto } from './dtos/places.dto';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @UseGuards(AuthMiddleware)
  @Post()
  async create(@Body() createPlaceDto: CreatePlacesDto) {
    return this.placesService.createPlace(createPlaceDto);
  }

  @UseGuards(AuthMiddleware)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.placesService.getPlaceById(id);
  }

  @UseGuards(AuthMiddleware)
  @Get()
  async findAll() {
    return await this.placesService.getAllPlaces();
  }

  @UseGuards(AuthMiddleware)
  @Get('type/:type')
  async findByType(@Param('type') type: string) {
    return await this.placesService.getPlacesByType(type);
  }

  @UseGuards(AuthMiddleware)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlaceDto: UpdatePlacesDto,
  ) {
    return this.placesService.updatePlace(id, updatePlaceDto);
  }

  @UseGuards(AuthMiddleware)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.placesService.deletePlace(id);
  }
}
