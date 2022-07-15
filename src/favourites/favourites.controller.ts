import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  getAll() {
    return this.favouritesService.getAll();
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeArtist(id);
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favouritesService.removeTrack(id);
  }
}
