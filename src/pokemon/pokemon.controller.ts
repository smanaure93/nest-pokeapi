import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    const pokemon = await this.pokemonService.create(createPokemonDto);
    return {
      ok: true,
      method: 'POST',
      pokemon,
    };
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const pokemons = await this.pokemonService.findAll(pagination);
    return {
      ok: true,
      method: 'GET',
      pokemons,
    };
  }

  @Get(':search')
  async findOne(@Param('search') search: string) {
    const pokemon = await this.pokemonService.findOne(search);
    return {
      ok: true,
      method: 'GET',
      pokemon,
    };
  }

  @Patch(':search')
  async update(
    @Param('search') search: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    const pokemon = await this.pokemonService.update(search, updatePokemonDto);
    return {
      ok: true,
      method: 'PATCH',
      pokemon,
    };
  }

  @Delete(':search')
  async remove(@Param('search', ParseMongoIdPipe) search: string) {
    const pokemon = await this.pokemonService.remove(search);
    return {
      ok: true,
      method: 'DELETE',
      pokemon,
    };
  }
}
