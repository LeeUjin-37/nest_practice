import { Module } from '@nestjs/common';
import { MemberModule } from './module/member/member.module';
import { CoreModule } from './module/core/core.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './controller/auth/auth.controller';
import { RedisModule } from './module/redis/redis.module';
import { RedisService } from './service/redis/redis.service';

@Module({
  imports: [
    MemberModule, 
    CoreModule, 
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
