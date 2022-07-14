import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsUUID()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  @Min(1)
  duration: number; // integer number
}
