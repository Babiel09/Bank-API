import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Prisma, Transacoes, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaService } from "prisma/prisma.service";
import { CreationUser } from "./DTO/user.dto";

interface UserThings{
    id?:number;
    name?:string;
    email?:string;
    password?:string;
    transacoes:Transacoes[];
    data?:{
        [key:string]:any
    };
};


@Injectable()
export class UserService{
    private readonly prisma: Prisma.UserDelegate<DefaultArgs>;
    constructor(private readonly pr:PrismaService){
        this.prisma = pr.user;
    };

    public async verificaEmail(email:string):Promise<User>{
        try{
            const verificaEmail = await this.prisma.findUnique({
                where:{
                    email:email
                },
            });

            return verificaEmail;
        }catch(err){
            console.error(err);
        };
    };

    public async Insert(data:CreationUser):Promise<User>{
        try{
            this.verificaEmail(data.email);
            const tentaInsert = await this.prisma.create({
                data:data
            });

            if(!tentaInsert){
                console.error("Error to insert the data into the db!");
              throw new ExceptionsHandler();
            };
            
            return tentaInsert;
            
        } catch(err){
            console.error(err);
        };
    };
    
    public async SelectAll():Promise<User[]>{
        try{
            const tentaSelect = await this.prisma.findMany();
            if(!tentaSelect){
                console.error("Error to select all the data into the db!");
                throw new ExceptionsHandler();

            };
            return tentaSelect;
        }catch(err){
            console.error(err);
        };
    };
    
    public async SelectOne(id:number):Promise<User>{
        try{
            const tentaSelectOne = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                }
            });
            if(!tentaSelectOne){
                console.error("Error to select all the data into the db!");
                
            };
            return tentaSelectOne;
        } catch(err){
            console.error(err);
        };
    };  

};