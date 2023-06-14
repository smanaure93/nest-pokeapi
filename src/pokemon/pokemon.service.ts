import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    const { name, no } = createPokemonDto;
    try {
      const pokemon = await this.pokemonModel.create({
        no,
        name: name.toLowerCase(),
      });
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto) {
    try {
      const { limit = this.defaultLimit, offset = 0 } = pagination;
      return await this.pokemonModel
        .find()
        .limit(limit)
        .skip(offset)
        .sort({ no: 1 })
        .select('-__v');
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(search: string) {
    try {
      let pokemon: Pokemon;
      // Se busca por número
      if (!isNaN(+search)) {
        pokemon = await this.pokemonModel.findOne({ no: search });
      }
      // Se busca por id de mongo
      if (!pokemon && isValidObjectId(search)) {
        pokemon = await this.pokemonModel.findById(search);
      }
      // Se busca por nombre
      if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({
          name: search.toLowerCase().trim(),
        });
      }
      if (!pokemon) {
        throw new NotFoundException(
          `El termino ${search} no arrojó ningún resultado`,
        );
      }
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(search: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(search);
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(search: string) {
    try {
      const pokemon = await this.findOne(search);
      await pokemon.deleteOne();
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.status === 404) throw error;
    if (error.code === 11000) {
      throw new BadRequestException(
        `El pokemon ya existe en la base de datos ${JSON.stringify(
          error.keyValue,
        )}`,
      );
    }
    console.log(error.status);
    throw new InternalServerErrorException(
      'Ocurrió un error en la operación, contacte a soporte',
    );
  }
}
