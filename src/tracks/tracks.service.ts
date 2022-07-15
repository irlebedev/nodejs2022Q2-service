import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
    };

    this.tracks.push(newTrack);

    return this.tracks.find((track) => track.id === newTrack.id);
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Track doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackToUpdate = this.tracks.find((track) => track.id === id);

    if (!trackToUpdate) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Track doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.tracks = this.tracks.map((track) => {
      if (track.id === id) {
        return {
          ...track,
          ...updateTrackDto,
        };
      }
      return track;
    });

    return this.tracks.find((track) => track.id === id);
  }

  remove(id: string) {
    const trackToDelete = this.tracks.find((track) => track.id === id);

    if (!trackToDelete) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Track doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  findByAlbumId(id: string) {
    return this.tracks.find((track) => track.albumId === id);
  }

  findByArtistId(id: string) {
    return this.tracks.find((track) => track.artistId === id);
  }
}
