import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { MoneyController } from "./money.controller";
import { MoneyService } from "./money.service";
import { MoneyProcessor } from "src/processor/money.processor";
import { BullModule } from "@nestjs/bull";
import { TRANSACOES_QUEUE } from "src/constants/constansts";

@Module({
    imports:[
        BullModule.registerQueue({
            name:TRANSACOES_QUEUE,
        }),
    ],
    controllers:[MoneyController],
    providers:[PrismaService,MoneyService, MoneyProcessor],
})
export class MoneyModule{};