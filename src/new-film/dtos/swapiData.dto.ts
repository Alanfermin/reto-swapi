import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SwapiDataDto {
  @ApiProperty({ description: 'ID de la película', example: 1 })
  @IsInt()
  @IsOptional()
  idFilm?: number;

  @ApiProperty({ description: 'ID del personaje', example: '1' })
  @IsString()
  @IsOptional()
  idPerson?: string;

  @ApiProperty({ description: 'ID del planeta', example: '1' })
  @IsString()
  @IsOptional()
  idPlanet?: string;

  @ApiProperty({ description: 'ID de la especie', example: '1' })
  @IsString()
  @IsOptional()
  idSpecies?: string;

  @ApiProperty({ description: 'ID de la nave estelar', example: '1', required: false })
  @IsString()
  @IsOptional()
  idStarship?: string;

  @ApiProperty({ description: 'ID del vehículo', example: '1' })
  @IsString()
  @IsOptional()
  idVehicle?: string;
}