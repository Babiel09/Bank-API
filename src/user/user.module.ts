import { Module } from "@nestjs/common";
import { CreationUser } from "./DTO/user.dto";
import { UserService } from "./user.service";
import { PrismaService } from "prisma/prisma.service";

@Module({
    imports:[UserModule],
    controllers:[],
    providers:[CreationUser, UserService,PrismaService],
})
export class UserModule{};