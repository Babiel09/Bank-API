import { Injectable } from "@nestjs/common";
import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

@Injectable()
export class  CreationUser{
    @IsString({message:"The name needs to be a string"})
    @MaxLength(20, {message:"The name only can have 20 caractheres!"})
    name:string;

    @IsEmail(undefined, {message:"The email needs to follow this: **youremail@yourpriver.com**"})
    email:string;

    @IsString({message:"The password needs to be a string!"})
    @MinLength(8,{message:"The password needs to have 8 caractheres!"})
    password:string;

    @IsNumber()
    saldo:number;

};