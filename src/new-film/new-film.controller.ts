import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { NewFilmService } from './new-film.service';
import { SwapiDataDto, TextToAudioDto } from './dtos';
import { Response } from 'express';

@ApiTags('New Film')  
@Controller('new-film')
export class NewFilmController {
  constructor(private readonly newFilmService: NewFilmService) {}

  @Post('get-data')
  @ApiOperation({ summary: 'Obtener Datos de SWAPI y guardar en base de datos' }) 
  @ApiBody({ type: SwapiDataDto }) 
  async getSwapiData(
    @Body() swapiDataDto: SwapiDataDto,
  ) {
    console.log('swapiDataDto',swapiDataDto)
    // Lista de IDs no disponibles en la API
    const restrictedVehicleIds = ['1', '2', '3', '9', '10', '11', '12'];
    const restrictedStarshipIds = ['1','4','6'];
    if (swapiDataDto.idFilm < 1 || swapiDataDto.idFilm > 7) {
      return {
        success: false,
        message: `El ID de la película ${swapiDataDto.idFilm} no está disponible en la API. Solo se permiten idFilm con IDs entre 1 y 7.`,
      };
    }
    // Validar que el id no esté en la lista restringida
    if (restrictedVehicleIds.includes(swapiDataDto.idVehicle)) {
      return {
        success: false,
        message: `El ID del vehículo ${swapiDataDto.idVehicle} no está disponible en la API. Intenta con otro número de ID en idVehicle.`,
      };
    }
    if (restrictedStarshipIds.includes(swapiDataDto.idStarship)) {
      return {
        success: false,
        message: `El ID del starship ${swapiDataDto.idStarship} no está disponible en la API. Intenta con otro número de id en idStarship.`,
      };
    }

    try {
      const data = await this.newFilmService.obtenerDatosSwapi(swapiDataDto);
      return { success: true, data };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}