import { Controller, Get, Post, Res, Delete, Put, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { CreationUser } from "./DTO/user.dto";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { UserAuth } from "./auth/user.auth";

@Controller("/user")
export class UserController{
    constructor(private readonly userService:UserService, private readonly userAuth:UserAuth){};

    @Get("/v1")
    private async getAllUsers(@Res() res:Response):Promise<Response>{
        try{
            const todosUsers = await this.userService.SelectAll();
            if(!todosUsers){
                console.error("We find an error to show all users, pelase verify this line of code!");
                return res.status(500).json({server:"We find an error to show all users, pelase verify this line of code!"});
            };
            console.log(todosUsers);
            return res.status(200).send(todosUsers);
        } catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    };

    @Get("/v1/:id")
    private async getOneuser(@Res() res:Response, @Param("id") id:number):Promise<Response>{
        try{
            const usuarioEspecifo = await this.userService.SelectOne(id);
            if(!usuarioEspecifo){
                console.error("Error to show the specified user!");
                return res.status(500).json({server:"Please try later!"});
            }
            console.log(usuarioEspecifo);
            return res.status(200).send(usuarioEspecifo);

        } catch(err){
            console.error(err);
            return res.status(500).send(err);
        };
    };

    @Post("/v1")
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

            const fazSenhaToken = await this.userAuth.createNewToken(data.password);
            const verifica = await this.userAuth.checkTheToken(fazSenhaToken);

            if(!verifica){
                console.error("We can't verify the JWT token, please try again later!");
               return res.status(500).json({server:"We can't verify the JWT token, please try again later!"});
            };

            data.password = fazSenhaToken;

            const verificaOEmail = await this.userService.verificaEmail(data.email);

            if(verificaOEmail){
                console.error("This email already existis!");
                return res.status(400).json({server:`The email: ${data.email}, already existis!`});
            };

            const fazNovouser = await this.userService.Insert(data);

            if(!fazNovouser){
                console.error("We can't post the user!");
                return res.status(500).json({server:"We can't post the user, please try again later!"});
            };

            console.log(`New user: ${data.name}!`);
            console.log(fazNovouser);
            return res.status(201).send(fazNovouser);

            
        }catch(err){
            console.error(err);
            return res.status(500).send(err);
        };
    };
};