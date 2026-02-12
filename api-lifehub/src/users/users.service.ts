import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(dto: CreateUserDto) {
    const { password, confirmPassword } = dto;

    if (!password || password !== confirmPassword) {
      throw new BadRequestException('A senha não foi confirmada corretamente');
    }

    const existsUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existsUser) {
      throw new ConflictException(
        'Já existe um usuário cadastro com esse email',
      );
    }

    try {
      const createUser = this.userRepository.create({
        name: dto.name,
        email: dto.email,
        passwordHash: await this.hashPassword(password),
      });

      await this.userRepository.save(createUser);
      return createUser;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
