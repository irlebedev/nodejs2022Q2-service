import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(private trackService: TracksService) {}
  private artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      ...createArtistDto,
      id: uuidv4(),
    };

    this.artists.push(newArtist);

    return this.artists.find((artist) => artist.id === newArtist.id);
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Artist doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistToUpdate = this.artists.find((artist) => artist.id === id);

    if (!artistToUpdate) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Artist doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.artists = this.artists.map((artist) => {
      if (artist.id === id) {
        return {
          ...artist,
          ...updateArtistDto,
        };
      }
      return artist;
    });

    return this.artists.find((artist) => artist.id === id);
  }

  remove(id: string) {
    const artistToDelete = this.artists.find((artist) => artist.id === id);

    if (!artistToDelete) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Artist doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);

    const trackToUpdate = this.trackService.findByArtistId(id);

    if (trackToUpdate) {
      this.trackService.update(trackToUpdate.id, {
        ...trackToUpdate,
        albumId: null,
        artistId: null,
      });
    }
  }
}
