import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    const { password, ...userResponse } = this.users.find(
      (user) => user.id === newUser.id,
    );

    return userResponse;
  }

  findAll() {
    return this.users.map((user) => {
      const { password, ...userResponse } = user;
      return userResponse;
    });
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "User doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { password, ...userResponse } = user;

    return userResponse;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = this.users.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "User doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (userToUpdate.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Old password is wrong',
          error: 'Not Found',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          password: updateUserDto.newPassword,
          version: user.version + 1,
          updatedAt: Date.now(),
        };
      }
      return user;
    });

    const user = this.users.find((user) => user.id === id);
    const { password, ...userResponse } = user;

    return userResponse;
  }

  remove(id: string) {
    const userToDelete = this.users.find((user) => user.id === id);

    if (!userToDelete) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: "User doesn't exist",
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.users = this.users.filter((user) => user.id !== id);
  }
}
