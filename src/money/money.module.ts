import { Module } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { MoneyController } from "./money.controller";
import { MoneyService } from "./money.service";

@Module({
    imports:[],
    controllers:[MoneyController],
    providers:[PrismaService, MoneyService],
})
export class MoneyModule{};