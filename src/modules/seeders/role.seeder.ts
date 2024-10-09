import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class RoleSeeder {
  private readonly logger = new Logger(RoleSeeder.name);

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed() {
    const roles = [{ name: 'admin' }, { name: 'player' }];

    for (const role of roles) {
      const exists = await this.roleRepository.findOne({
        where: { name: role.name },
      });
      if (!exists) {
        const newRole = this.roleRepository.create(role);
        await this.roleRepository.save(newRole);
        this.logger.log(`Role '${role.name}' has been added.`);
      } else {
        this.logger.log(`Role '${role.name}' already exists.`);
      }
    }
  }
}
