import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(private trackService: TracksService) {}
  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
    };

    this.albums.push(newAlbum);

    return this.albums.find((album) => album.id === newAlbum.id);
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Album doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumToUpdate = this.albums.find((album) => album.id === id);

    if (!albumToUpdate) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Album doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.albums = this.albums.map((album) => {
      if (album.id === id) {
        return {
          ...album,
          ...updateAlbumDto,
        };
      }
      return album;
    });

    return this.albums.find((album) => album.id === id);
  }

  remove(id: string) {
    const albumToDelete = this.albums.find((album) => album.id === id);

    if (!albumToDelete) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Album doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.albums = this.albums.filter((album) => album.id !== id);

    const trackToUpdate = this.trackService.findByAlbumId(id);

    if (trackToUpdate) {
      this.trackService.update(trackToUpdate.id, {
        ...trackToUpdate,
        albumId: null,
      });
    }
  }
}
