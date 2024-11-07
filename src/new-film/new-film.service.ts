import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SwapiService } from 'src/swapi/swapi.service';
import { SwapiDataDto, TextToAudioDto } from './dtos';
import { createNewFilm, } from './use-cases/index'
import { NewFilmEntity } from './entity';

import OpenAI from 'openai';

interface Options {
  filmName: string;
  personaName: string;
  planetaName: string;
  specieName: string;
  starshipName: string;
  vehiculoName: string;
}

@Injectable()
export class NewFilmService {

    private openai: OpenAI;

    constructor(private readonly swapiService: SwapiService,
      @InjectRepository(NewFilmEntity)
      private readonly newFilmRepository: Repository<NewFilmEntity>) {}



    async getSwapiData(swapiDataDto: SwapiDataDto) {
      const { idFilm, idPerson, idPlanet, idSpecies, idStarship, idVehicle } = swapiDataDto;
        try {
          const film =  idFilm ? await this.swapiService.getFilms({ id: idFilm }) : null;
          const person = idPerson ? await this.swapiService.getPeople({ id: idPerson }) : null;
          const planet = idPlanet ? await this.swapiService.getPlanet({ id: idPlanet }) : null;
          const species = idSpecies ? await this.swapiService.getSpecies({ id: idSpecies }) : null;
          const starship = idStarship ? await this.swapiService.getStarShips({ id: idStarship }) : null;
          const vehicle = idVehicle ? await this.swapiService.getVehicles({ id: idVehicle }) : null;
    
          return {
            film,
            person,
            planet,
            species,
            starship,
            vehicle,
          };
        } catch (error) {
          console.error('getSwapiData - Error:', error);
          throw new HttpException('getSwapiData', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }


    async obtenerDatosSwapi(swapiDataDto: SwapiDataDto) {
      try {
        const swapiData = await this.getSwapiData(swapiDataDto);
        const options: Options = {
          filmName: swapiData.film?.titulo || 'Id de título no buscado',
          personaName: swapiData.person?.nombre || 'Id de Persona no buscada',
          planetaName: swapiData.planet?.nombre || 'Id de Planeta no buscado',
          specieName: swapiData.species?.nombre || 'Id de Especie no buscado',
          starshipName: swapiData.starship?.nombre || 'Id de Nave no buscado',
          vehiculoName: swapiData.vehicle?.nombre || 'Id de Vehículo no buscado',
        };
        return await createNewFilm(this.openai, options,this.newFilmRepository);
      } catch (error) {
          console.error('createMessageOpenAiWithData - Error:', error);
          throw new HttpException('createMessageOpenAiWithData', HttpStatus.INTERNAL_SERVER_ERROR);
      }

    }


}

