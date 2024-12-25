import { Controller, Get, Post, Res, Delete, Put, Body, Param, Query, Logger, UsePipes } from "@nestjs/common";
import { UserService, UserThings } from "./user.service";
import { Response } from "express";
import { CreationUser } from "./DTO/user.dto";
import * as bcrypt from "bcrypt";
import { UserPipe } from "./pipes/user.pipes";
import { PrismaService } from "prisma/prisma.service";

@Controller("/user")
export class UserController{
    private readonly logger = new Logger(UserController.name);
    private readonly prisma;
    constructor(private readonly userService:UserService, private readonly pr:PrismaService){
        this.prisma = pr.user;
    };

    @Get("/v1")
    private async getAllUsers(@Res() res:Response):Promise<Response>{
        try{
            const todosUsers = await this.userService.SelectAll();
            if(!todosUsers){
                this.logger.error("We find an error to show all users, pelase verify this line of code!");
                return res.status(500).json({server:"We find an error to show all users, pelase verify this line of code!"});
            };
            this.logger.log(todosUsers);
            return res.status(200).send(todosUsers);
        } catch(err){
            this.logger.error(err);
            return res.status(500).send(err);
        }
    };
    @Get("/v1/search")
    private async getUserByname(@Res() res:Response, @Query("name") name:string):Promise<Response>{
        try{

            this.logger.log("Rota do query!");

            const user = await this.userService.SearchuserByName(name);

            if(!user || user.length === 0){
                this.logger.error(`We can't find the user with this name: ${name}`);
                return res.status(404).json({server:`We can't find the user with this name: ${name}`});
            };

            this.logger.log(user);
            return res.status(200).send(user);

        }catch(err){
            this.logger.error(err);
            return res.status(500).send(err);
        };
    };

    @Get("/v1/:id")
    private async getOneuser(@Res() res:Response, @Param("id") id:number):Promise<Response>{
        try{
            this.logger.log("Rota do get by id!");
            const usuarioEspecifo = await this.userService.SelectOne(id);
            if(!usuarioEspecifo){
                this.logger.error("Error to show the specified user!");
                return res.status(404).json({server:"User not found, please try later!"});
            }
            this.logger.log(usuarioEspecifo);
            return res.status(200).send(usuarioEspecifo);

        } catch(err){
            this.logger.error(err);
            return res.status(500).send(err);
        };
    };


    @Post("/v1")
    @UsePipes(UserPipe)
    private async postNewUser(@Body() data:CreationUser, @Res() res:Response):Promise<Response>{
        try{
            if(!data.name){
                return res.status(400).json({server:"You need to pass the user NAME!"});
            };

            if(!data.email){
                return res.status(400).json({server:"You need to pass the user EMAIL!"});
            };

            if(!data.password){
                return res.status(400).json({server:"You need to pass the user PASSWORD!"});
            };

            const fazSenhaToken = await bcrypt.hash(data.password, 12);

            data.password = fazSenhaToken;

            const verificaOEmail = await this.userService.verificaEmail(data.email);

            if(verificaOEmail){
                this.logger.error("This email already existis!");
                return res.status(400).json({server:`The email: ${data.email}, already existis!`});
            };

            const fazNovouser = await this.userService.Insert(data);

            if(!fazNovouser){
                this.logger.error("We can't post the user!");
                return res.status(500).json({server:"We can't post the user, please try again later!"});
            };

            this.logger.log(`New user: ${data.name}!`);
            this.logger.log(fazNovouser);
            return res.status(201).send(fazNovouser);

            
        }catch(err){
            this.logger.error(err);
            return res.status(500).send(err);
        };
    };

    @Get("/v3/login")
    private async login(@Res() res:Response, @Body() data:{email:string, password:string}):Promise<Response>{
        try{
           const colocaOUsuarioComoLogado = await this.userService.Login(data);

           const comparacao = await bcrypt.compare(data.password, colocaOUsuarioComoLogado.password);

           if(!comparacao){
               return res.status(401).json({server:"Login is fudido!"});
           };

           let mudarEstadoLogin = colocaOUsuarioComoLogado.login = true;

           this.logger.debug(colocaOUsuarioComoLogado.email)
           this.logger.debug(colocaOUsuarioComoLogado.name)
           this.logger.debug(colocaOUsuarioComoLogado.login)
           const doyouremember = await this.prisma.update({
               where:{
                   id:Number(colocaOUsuarioComoLogado.id),
                },
                data:{
                    login:mudarEstadoLogin,   
                }
            });
            this.logger.debug(colocaOUsuarioComoLogado.login);

           return res.status(202).json({server:"Login is auhorazed!"});

        }catch(err){
            this.logger.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };
    
    @Delete("/v2/:id")
    private async deleteOneUser(@Param("id") id:number, @Res() res:Response):Promise<Response>{
        try{
            const deletado = await this.userService.Delete(id);
            if(!deletado){
                this.logger.error("Error to delete the data, please try again later!");
                return res.status(201).json({server:"Error to delete the data, please try again later!"});
            };
            this.logger.log("Usuário deletado");
            return res.status(204).json({server: "User is sucefully deleted!"});
        }catch(err){
            this.logger.error(err);
            return res.status(500).send(err);
        };
    };

    @Put("/v1/:id")
    private async postASpecifiedUser(@Param("id") id:number, @Body()data:UserThings, @Res() res:Response){
        try{

            if(data.email){
                this.logger.error("The user can't change their email!");
                return res.status(401).json({server:"You can't change your email, try to update another element!"});
            };

            const updatedUser = await this.userService.Update(id,data);

            return res.status(202).send(updatedUser);
        }catch(err){
            this.logger.error(err);
            return res.status(500).send(err);
        };
    };

};