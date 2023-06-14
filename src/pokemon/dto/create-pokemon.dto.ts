import { IsString, MinLength, IsInt, IsPositive, Min } from 'class-validator';

export class CreatePokemonDto {
  @IsString({ message: 'El nombre del pokemon debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre del pokemon debe tener al menos 3 carácteres',
  })
  readonly name: string;

  @IsInt({
    message: 'El número del pokemon debe ser un número entero',
  })
  @IsPositive({
    message: 'El número del pokemon debe ser positivo',
  })
  @Min(1, {
    message: 'El número del pokemon debe ser mayor o igual a 1',
  })
  readonly no: number;
}
