import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async runSeed() {
    const data = await this.seedService.runSeed();
    return { ...{ ok: true, method: 'GET' }, ...data };
  }
}
