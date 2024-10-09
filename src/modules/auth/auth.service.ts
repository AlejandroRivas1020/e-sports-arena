import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const { name, email, password } = registerUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email is already registered');
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      throw new UnauthorizedException(
        'Name must contain only letters and spaces.',
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-.])[A-Za-z\d@$!%*?&+-.]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new UnauthorizedException(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&).',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = await this.roleRepository.findOne({
      where: { name: 'player' },
    });
    if (!role) {
      throw new Error('Role "player" not found');
    }

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      roleId: role.id,
    });

    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, roleId: user.role.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
