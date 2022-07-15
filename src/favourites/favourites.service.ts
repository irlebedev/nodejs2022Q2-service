import { ArtistsService } from './../artists/artists.service';
import { AlbumsService } from './../albums/albums.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { Favourite, FavouritesResponse } from './entities/favourite.entity';

@Injectable()
export class FavouritesService {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}
  private favourites: Favourite = { artists: [], albums: [], tracks: [] };

  getAll(): FavouritesResponse {
    const favouritesResponse = { artists: [], albums: [], tracks: [] };

    for (const albumId of this.favourites.albums) {
      try {
        favouritesResponse.albums.push(this.albumsService.findOne(albumId));
      } catch (error) {}
    }

    for (const artistId of this.favourites.artists) {
      try {
        favouritesResponse.artists.push(this.artistsService.findOne(artistId));
      } catch (error) {}
    }

    for (const trackId of this.favourites.tracks) {
      try {
        favouritesResponse.tracks.push(this.tracksService.findOne(trackId));
      } catch (error) {}
    }

    return favouritesResponse;
  }

  addAlbum(id: string) {
    try {
      const album = this.albumsService.findOne(id);

      if (album) {
        this.favourites.albums.push(id);
        return { message: 'Album was added to favourites' };
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "Album doesn't exist",
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeAlbum(id: string) {
    const albumId = this.favourites.albums.find((albumId) => albumId === id);

    if (!albumId) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Album doesn't exist",
          error: 'Unprocessable Entity',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.favourites.albums = this.favourites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  addArtist(id: string) {
    try {
      const artist = this.artistsService.findOne(id);

      if (artist) {
        this.favourites.artists.push(id);
        return { message: 'Artist was added to favourites' };
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "Artist doesn't exist",
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeArtist(id: string) {
    const artistId = this.favourites.artists.find(
      (artistId) => artistId === id,
    );

    if (!artistId) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Artist doesn't exist",
          error: 'Unprocessable Entity',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.favourites.artists = this.favourites.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  addTrack(id: string) {
    try {
      const track = this.tracksService.findOne(id);

      if (track) {
        this.favourites.tracks.push(id);
        return { message: 'Track was added to favourites' };
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: "Track doesn't exist",
          error: 'Unprocessable Entity',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  removeTrack(id: string) {
    const trackId = this.favourites.tracks.find((trackId) => trackId === id);

    if (!trackId) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Track doesn't exist",
          error: 'Unprocessable Entity',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.favourites.tracks = this.favourites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }
}
