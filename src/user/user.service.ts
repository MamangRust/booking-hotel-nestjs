import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';
import PasswordHash from 'src/utils/hash'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findId(id: number): Promise<User> {
        try {
            const result = this.userRepository.findOne({
                where: {
                    id: id
                }
            })

            return result
        } catch (error) {
            throw new NotFoundException("failed to get find id user: " + error)
        }
    }

    async findEmail(email: string): Promise<User> {
        try {
            const result = this.userRepository.findOne({
                where: {
                    email: email
                }
            })

            return result;
        } catch (error) {
            throw new NotFoundException("failed to get find email user: " + error)
        }
    }

    async create(dto: SignUpDto): Promise<User> {
        try {

            const existingUser = await this.findEmail(dto.email);
            if (existingUser) {
                throw new BadRequestException({
                    message: 'Email is already registered',
                });
            }


            const passwordHash = await PasswordHash.hashPassword(dto.password);


            const newUser = await this.userRepository.create({
                name: dto.name,
                email: dto.email,
                password: passwordHash,
                isAdmin: false,
            });

            const createdUser = await this.userRepository.save(newUser);

            return createdUser;
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Failed to create user',
                error: error.message,
            });
        }
    }

}
