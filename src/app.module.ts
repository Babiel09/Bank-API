import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bull';
import { delay } from 'rxjs';

@Module({
  imports: [
    UserModule,
    BullModule.forRoot({
      redis:process.env.REDIS_URL,
      defaultJobOptions:{
        removeOnComplete:100,
        attempts:3,
        removeOnFail:300,
        backoff:{
          type:"exponential",
          delay:1000,
        }
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService,],
})
export class AppModule {}
