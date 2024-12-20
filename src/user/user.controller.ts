import { Controller, Get, Post, Res, Delete, Put, Body, Param, Query } from "@nestjs/common";
import { UserService, UserThings } from "./user.service";
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
    @Get("/v1/search")
    private async getUserByname(@Res() res:Response, @Query("name") name:string):Promise<Response>{
        try{

            console.log("Rota do query!");

            const user = await this.userService.SearchuserByName(name);

            if(!user || user.length === 0){
                console.error(`We can't find the user with this name: ${name}`);
                return res.status(404).json({server:`We can't find the user with this name: ${name}`});
            };

            console.log(user);
            return res.status(200).send(user);

        }catch(err){
            console.error(err);
            return res.status(500).send(err);
        };
    };

    @Get("/v1/:id")
    private async getOneuser(@Res() res:Response, @Param("id") id:number):Promise<Response>{
        try{
            console.log("Rota do get by id!");
            const usuarioEspecifo = await this.userService.SelectOne(id);
            if(!usuarioEspecifo){
                console.error("Error to show the specified user!");
                return res.status(404).json({server:"User not found, please try later!"});
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

    @Delete("/v2/:id")
    private async deleteOneUser(@Param("id") id:number, @Res() res:Response):Promise<Response>{
        try{
            const deletado = await this.userService.Delete(id);
            if(!deletado){
                console.error("Error to delete the data, please try again later!");
                return res.status(201).json({server:"Error to delete the data, please try again later!"});
            };
            console.log("Usuário deletado");
            return res.status(204).json({server: "User is sucefully deleted!"});
        }catch(err){
            console.error(err);
            return res.status(500).send(err);
        };
    };

    @Put("/v1/:id")
    private async postASpecifiedUser(@Param("id") id:number, @Body()data:UserThings, @Res() res:Response){
        try{

            if(data.email){
                console.error("The user can't change their email!");
                return res.status(401).json({server:"You can't change your email, try to update another element!"});
            };

            const updatedUser = await this.userService.Update(id,data);

            return res.status(202).send(updatedUser);
        }catch(err){
            console.error(err);
            return res.status(500).send(err);
        };
    };

};