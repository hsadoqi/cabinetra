import { HealthModule } from './health/health.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
