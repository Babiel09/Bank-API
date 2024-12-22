import { Module } from "@nestjs/common";
import { AuthService } from "./auth.server";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    imports:[
        PrismaModule,
    ],
    controllers:[],
    providers:[AuthService],
    exports:[AuthService],
})
export class AuthModule{};