import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bull';
import { MoneyModule } from './money/money.module';
import { TRANSACOES_QUEUE } from './constants/constansts';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule,
     MoneyModule, 
   BullModule.forRoot({
    redis:{
      host:"localhost",
      port:6379,
    }
   }),
   BullModule.registerQueue({
    name:TRANSACOES_QUEUE,
   }),
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}
