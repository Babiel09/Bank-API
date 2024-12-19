import { Controller, Get, Post, Res, Delete, Put, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { CreationUser } from "./DTO/user.dto";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Controller("/user")
export class UserController{
    constructor(private readonly userService:UserService){};

    @Get("/v1")
    private async getAllUsers(@Res() res:Response):Promise<Response>{
        try{
            const todosUsers = await this.userService.SelectAll();
            if(!todosUsers){
                console.error("We find an error to show all users, pelase verify this line of code!");
                return res.status(500).json({server:"We find an error to show all users, pelase verify this line of code!"});
            };
            return res.status(200).send(todosUsers);
        } catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    };

    @Post("/v1")
    private async postNewUser(@Body() data:CreationUser, @Res() res:Response):Promise<Response>{
        try{
            if(!data.name){
                res.status(400).json({server:"You need to pass the user NAME!"});
                throw new ExceptionsHandler();
            };

            if(!data.email){
                res.status(400).json({server:"You need to pass the user EMAIL!"});
                throw new ExceptionsHandler();
            };

            if(!data.password){
                res.status(400).json({server:"You need to pass the user PASSWORD!"});
                throw new ExceptionsHandler();
            };
            
        }catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    };
};