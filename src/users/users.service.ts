import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BCryptHashProvider from 'src/providers/hashProvider';
import JWTProvider from 'src/providers/jwtProvider';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dtos/user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    private bcryptHashProvider: BCryptHashProvider,
    private jwtProvider: JWTProvider,
  ) {}
  async login(login: LoginUserDto) {
    // check if user exists
    const user = await Users.findByEmail(login.email);

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const isPasswordCorrect = await this.bcryptHashProvider.compare(
      login.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.UNAUTHORIZED);
    }
    const token = this.jwtProvider.generateToken(user.id);

    return { user, token };
  }

  async create(createUserDto: CreateUserDto) {
    return Users.create(createUserDto);
  }

  async findAll() {
    return await Users.findAll();
  }

  async findOne(id: number) {
    return await Users.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await Users.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await Users.delete(id);
  }

  async addPlace(userId: string, placeId: string) {
    return await Users.addPlace(userId, placeId);
  }
}
