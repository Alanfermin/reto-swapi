import OpenAI from 'openai';

import { Repository } from 'typeorm';
import { NewFilmEntity } from '../entity';
import { HttpException, HttpStatus } from '@nestjs/common';

interface Options {
  filmName: string;
  personaName: string;
  planetaName: string;
  specieName: string;
  starshipName: string;
  vehiculoName: string;
}

export const createNewFilm = async(openai:OpenAI, options:Options,newFilmRepository: Repository<NewFilmEntity>)=>{

  const { filmName,personaName,planetaName,specieName,starshipName,vehiculoName } = options;
   try {
  
    const datosDeSWAPI = newFilmRepository.create({
      nombreFilm: filmName,
      persona: personaName,
      planeta: planetaName,
      especie: specieName,
      nave: starshipName,
      vehiculo: vehiculoName,
    });
  
    await newFilmRepository.save(datosDeSWAPI);
    return datosDeSWAPI
   } catch (error) {
    console.error('createNewFilm - Error:', error);
    throw new HttpException('Error en createNewFilmOpenAiUseCase', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  
  
}