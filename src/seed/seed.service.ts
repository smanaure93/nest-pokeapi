import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async runSeed() {
    try {
      await this.pokemonModel.deleteMany({});
      const data = await this.http.get<PokeResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=151',
      );
      const { results } = data;
      const pokemonsToInsert: { name: string; no: number }[] = [];
      results.forEach(async ({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];
        pokemonsToInsert.push({
          no,
          name,
        });
      });
      await this.pokemonModel.insertMany(pokemonsToInsert);
      return { message: 'Seed excecuted...' };
    } catch (error) {
      console.log(error);
      throw new Error('Ocurrió un error, contacte a soporte');
    }
  }
}
