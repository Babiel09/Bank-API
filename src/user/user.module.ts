import { Logger, Module } from "@nestjs/common";
import { CreationUser } from "./DTO/user.dto";
import { UserService } from "./user.service";
import { PrismaService } from "prisma/prisma.service";
import { UserAuth } from "./auth/user.auth";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user.controller";

@Module({
    imports:[
        UserModule,
        ConfigModule.forRoot(),
       JwtModule.register({
        secret:process.env.JWT_SECRET,
        signOptions:{
            expiresIn:2313678592184
        },
       }),
    ],
    controllers:[UserController],
    providers:[CreationUser, UserService,PrismaService, UserAuth, Logger],
})
export class UserModule{};