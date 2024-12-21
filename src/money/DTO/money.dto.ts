import { Injectable } from "@nestjs/common";
import { Tipo } from "@prisma/client";
import { isInt, IsNumber, IsString, Max, MaxLength } from "class-validator";

@Injectable()
export class CreateTransacao{
        @IsString()
        @MaxLength(22, {message:"The name of the transaction is too long, the task needs to be less than 22 characters"})
        name:string;
        @Max(38467926479326489724)
        valor:number;
        @IsNumber()
        createdById:number;
        @MaxLength(32849790)
        tipo: Tipo;
};