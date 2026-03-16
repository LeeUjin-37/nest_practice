import { Module } from '@nestjs/common';
import { MemberModule } from './module/member/member.module';
import { CoreModule } from './module/core/core.module';
import { AuthModule } from './module/auth/auth.module';
import { RedisModule } from './module/redis/redis.module';
import { ChatModule } from './module/chat/chat.module';

@Module({
  imports: [
    MemberModule, 
    CoreModule, 
    AuthModule, 
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
