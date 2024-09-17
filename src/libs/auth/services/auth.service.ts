/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto, SignUpDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/libs/utils/services/hash.service';
import { UserService } from 'src/module/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async logInUsers(loginUser: LoginUserDto) {
    const user = await this.userService.findOneByEmail(loginUser.email);
    if (!user) {
      throw new BadRequestException('User not found. Try again.');
    }

    const isPasswordValid = await this.hashService.compare(
      loginUser.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password. Try again.');
    }

    const userPayload: UserJwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return await this.getTokens(userPayload);
  }
}
