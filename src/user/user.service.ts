import { Injectable, Logger } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { Prisma, Transacoes, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaService } from "prisma/prisma.service";
import { CreationUser } from "./DTO/user.dto";
import * as bcrypt from "bcrypt";
import { CreateTransacao } from "src/money/DTO/money.dto";

export interface UserThings{
    id?:number;
    name?:string;
    email?:string;
    password?:string;
    saldo?:number;
    login?:boolean;
    transacoes:Transacoes[];
    data?:{
        [key:string]:any
    };
    valor?:number;
};


@Injectable()
export class UserService{
    private readonly logger = new Logger(UserService.name);
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
            this.logger.error(err);
        };
    };

    public async Insert(data:CreationUser):Promise<User>{
        try{
            this.verificaEmail(data.email);
            const tentaInsert = await this.prisma.create({
                data:data
            });

            if(!tentaInsert){
                this.logger.error("Error to insert the data into the db!");
              throw new ExceptionsHandler();
            };
            
            return tentaInsert;
            
        } catch(err){
            this.logger.error(err);
        };
    };

    public async Delete(id:number):Promise<User>{
        try{
            const procuraOIdFornecido = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                },
            });

            if(!procuraOIdFornecido){
                this.logger.error("We can't find the specified user id!");
                return null;
            };

            const tentaDeletarOUsuarioNoDB = await this.prisma.delete({
                where:{
                    id:procuraOIdFornecido.id
                },
            });

            if(!tentaDeletarOUsuarioNoDB){
                this.logger.error("We can't try to delete the specified user!");
                return null;
            };

            return tentaDeletarOUsuarioNoDB;

        }catch(err){
            this.logger.error(err);
            return null;
        };
    };
    
    public async SelectAll():Promise<User[]>{
        try{
            const tentaSelect = await this.prisma.findMany();
            if(!tentaSelect){
                this.logger.error("Error to select all the data into the db!");
                throw new ExceptionsHandler();

            };
            return tentaSelect;
        }catch(err){
            this.logger.error(err);
        };
    };
    
    public async SelectOne(id: number): Promise<User | null> {
        try {
            const tentaSelectOne = await this.prisma.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!tentaSelectOne) {
                this.logger.error("Error: No data found for the given ID!");
                return null;
            }
            return tentaSelectOne;
        } catch (err) {
            this.logger.error("Error while selecting data from the database:", err);
            return null;
        }
    }

    public async Update(id:number,{data}:UserThings):Promise<User>{
        try{
            const procuraOIdFornecido = await this.prisma.findFirst({
                where:{
                    id:Number(id)
                },
            });

            if(!procuraOIdFornecido){
                this.logger.error("We can't find the specified user id!");
                return null;
            };

            const tentaAtualizarOsItensNoDB = await this.prisma.update({
                where:{
                    id:procuraOIdFornecido.id
                },
                data:data,
            });

            if(!tentaAtualizarOsItensNoDB){
                this.logger.error("We can't find the update the user in the DB!");
                return null;
            };

            return tentaAtualizarOsItensNoDB;

        }catch(err){
            this.logger.error(err);
            return null;
        };
    };

    public async UpdateTheValuePlus(data:{forId:number,valor:number}):Promise<User>{
        try{
            const procuraOIdFornecido = await this.prisma.findFirst({
                where:{
                    id:Number(data.forId)
                },
            });

            let saldoAtual = procuraOIdFornecido.saldo;

            if(!procuraOIdFornecido){
                this.logger.error("We can't find the specified user id!");
                return null;
            };

            const tentaAtualizarOsItensNoDB = await this.prisma.update({
                where:{
                    id:procuraOIdFornecido.id
                },
                data:{
                    saldo: saldoAtual += data.valor
                },
            });

            if(!tentaAtualizarOsItensNoDB){
                this.logger.error("We can't find the update the user in the DB!");
                return null;
            };

            return tentaAtualizarOsItensNoDB;
        }catch(err){
            this.logger.error(err);
            return null;
        };
    };

    public async UpdateTheValueDown(data:{forId:number,valor:number}):Promise<User>{
        try{
            const procuraOIdFornecido = await this.prisma.findFirst({
                where:{
                    id:Number(data.forId)
                },
            });

            let saldoAtual = procuraOIdFornecido.saldo;

            if(!procuraOIdFornecido){
                this.logger.error("We can't find the specified user id!");
                return null;
            };

            const tentaAtualizarOsItensNoDB = await this.prisma.update({
                where:{
                    id:procuraOIdFornecido.id
                },
                data:{
                    saldo: saldoAtual -= data.valor
                },
            });

            if(!tentaAtualizarOsItensNoDB){
                this.logger.error("We can't find the update the user in the DB!");
                return null;
            };

            return tentaAtualizarOsItensNoDB;
        }catch(err){
            this.logger.error(err);
            return null;
        };
    };

    public async SearchuserByName(name:string):Promise<User[]>{
        try{
            const tentaProcurarOUser = await this.prisma.findMany({
                where:{
                    name:{
                        contains:name,
                        mode:"insensitive",
                    },
                },
            });

            if(!tentaProcurarOUser || tentaProcurarOUser.length === 0){
                this.logger.error("We can't find the user in the DB!");
                return [];
            };

            return tentaProcurarOUser;

        }catch(err){
            this.logger.error(err);
            return null;
        };
    };

    public async Login(data:{email:string, password:string}):Promise<User | null>{
        try{
           const procuraUnico = await this.prisma.findUnique({
            where:{
                email:data.email
            },
           });

           if(!procuraUnico){
            return null;
           }

           return procuraUnico;
        }catch(err){
            this.logger.error(err);
            return null;
        };
    };

};