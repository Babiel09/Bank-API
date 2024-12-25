import { Logger, Module } from "@nestjs/common";
import { CreationUser } from "./DTO/user.dto";
import { UserService } from "./user.service";
import { PrismaService } from "prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { UserController } from "./user.controller";
import { PrismaModule } from "prisma/prisma.module";
import { UserPipe } from "./pipes/user.pipes"
import { BullModule } from "@nestjs/bull";
import { USER_QUEUE } from "src/constants/constansts";

@Module({
    imports:[
        PrismaModule,
        ConfigModule.forRoot(),
       JwtModule.register({
        secret:process.env.JWT_SECRET,
        signOptions:{
            expiresIn:2313678592184
        },
       }),
       BullModule.registerQueue({
        name:USER_QUEUE,
       }),
    ],
    controllers:[UserController],
    providers:[CreationUser, UserService, Logger, UserPipe],
    exports:[UserService],
})
export class UserModule{};