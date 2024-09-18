/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth services.') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Log in with a previously registered user.', description: 'Generates access to the system through a previously registered user.' })
  @ApiResponse({ status: 200, description: 'Successful login.' })
  @ApiResponse({ status: 400, description: 'The data entered is invalid.' })
  @ApiResponse({ status: 404, description: 'The user is not registered.' })
  @ApiResponse({ status: 500, description: 'An internal server error has occurred.' })
  @ApiBody({ description: 'Data of the user to be logged', type: LoginUserDto })
  @HttpCode(HttpStatus.OK)
  async logInUser(@Body() loginUser: LoginUserDto) {
    const user = await this.authService.logInUsers(loginUser);

    return { access_token: user.access_token };
  }
}
