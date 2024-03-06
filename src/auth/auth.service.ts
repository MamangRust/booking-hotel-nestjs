import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import PasswordHash from 'src/utils/hash'
import { SignUpDto } from './dto/signUp.dto';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private userService: UserService
    ) { }

    async login(dto: SignInDto): Promise<string> {
        try {
            const user = await this.userService.findEmail(dto.email);

            if (!user) {
                throw new BadRequestException({
                    message: 'Email not found',
                });
            }

            const validPassword = await PasswordHash.correctPassword(
                dto.password,
                user.password,
            );

            if (!validPassword) {
                throw new BadRequestException({
                    message: 'Invalid password',
                });
            }

            return this.generateToken(user.id);
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }


    async register(dto: SignUpDto): Promise<User> {
        const user = await this.userService.create(dto);

        return user;
    }

    private generateToken(id: number): string {
        const dataToken = { id };
        const secret = this.configService.get<string>('JWT_SECRET');
        const token = this.jwtService.sign(dataToken, { secret });
        return token;
    }
}
