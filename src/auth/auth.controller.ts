import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { User } from 'src/models/user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login and return authentication token' })
    @ApiResponse({ status: 200, description: 'Returns the authentication token' })
    @ApiBadRequestResponse({ description: 'Invalid email or password' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async login(@Body() signInDto: SignInDto): Promise<{ token: string }> {
        const token = await this.authService.login(signInDto);
        return { token };
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'Returns the registered user' })
    @ApiBadRequestResponse({ description: 'Bad request' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async register(@Body() signUpDto: SignUpDto): Promise<User> {
        const user = await this.authService.register(signUpDto);
        return user;
    }
}
