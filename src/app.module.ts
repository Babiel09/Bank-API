import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bull';
import { MoneyModule } from './money/money.module';

@Module({
  imports: [
    UserModule,
    MoneyModule,
   BullModule.forRoot({
    redis:{
      host:"localhost",
      port:6379,
    },
   }),
   BullModule.registerQueue({
    name:"transacoes-queue",
   }),
  ],
  controllers: [],
  providers: [PrismaService,],
})
export class AppModule {}
