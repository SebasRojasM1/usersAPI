/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/libs/utils/services/hash.service';
import { UserService } from 'src/module/user/services/user.service';
import { JwtPayload, Tokens } from '../types';

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

    const userPayload: JwtPayload = {
      sub: user.id,
      name: user.username,
      email: user.email,
    };

    return await this.getTokens(userPayload);
  }


  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('SECRET_KEY is not set');
    }

    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '20m',
    };

    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    return { access_token: accessToken };
  }

  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options, 
    });
  }
}
