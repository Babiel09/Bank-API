import { Logger, Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { MoneyController } from "./money.controller";
import { MoneyService } from "./money.service";
import { MoneyProcessor } from "src/money/processor/money.processor";
import { BullModule } from "@nestjs/bull";
import { TRANSACOES_QUEUE } from "src/constants/constansts";
import { UserService } from "src/user/user.service";

@Module({
    imports:[
        UserService,
        BullModule.registerQueue({
            name:TRANSACOES_QUEUE,
        }),
    ],
    controllers:[MoneyController],
    providers:[PrismaService,MoneyService,MoneyProcessor,Logger],
})
export class MoneyModule{};