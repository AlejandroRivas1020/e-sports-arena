import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../role/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  private readonly logger = new Logger(UserSeeder.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  private validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      throw new BadRequestException(
        'Password must be at least 8 characters long, contain at least one uppercase letter and one special character.',
      );
    }
  }

  async seed() {
    const users = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'Password@123',
        roleId: 'admin',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'Charlie',
        email: 'charlie@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'David',
        email: 'david@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'Eva',
        email: 'eva@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'Frank',
        email: 'frank@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'Grace',
        email: 'grace@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'Hannah',
        email: 'hannah@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'Isaac',
        email: 'isaac@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
      {
        name: 'Jack',
        email: 'jack@example.com',
        password: 'Password@123',
        roleId: 'player',
      },
    ];

    for (const user of users) {
      const role = await this.roleRepository.findOne({
        where: { name: user.roleId },
      });

      if (!role) {
        this.logger.error(
          `Role '${user.roleId}' does not exist. User '${user.name}' cannot be created.`,
        );
        continue;
      }

      this.validatePassword(user.password);

      const existingUser = await this.userRepository.findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = this.userRepository.create({
          name: user.name,
          email: user.email,
          password: hashedPassword,
          roleId: role.id,
        });

        await this.userRepository.save(newUser);
        this.logger.log(`User '${user.name}' has been added.`);
      } else {
        this.logger.log(`User '${user.email}' already exists.`);
      }
    }
  }
}
