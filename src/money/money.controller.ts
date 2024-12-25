import { Controller, Get, Post, Res, Delete, Put, Body, Param, Query, Logger } from "@nestjs/common";
import { MoneyService } from "./money.service";
import { Response } from "express";
import { CreateTransacao } from "./DTO/money.dto";
import { UserThings } from "src/user/user.service";

@Controller("/transfer")
export class MoneyController{
    private readonly logger = new Logger(MoneyController.name);
    constructor(private readonly moneyService:MoneyService){};

    @Post("/v1/transfer")
    private async doTheTransfer(@Res() res:Response, @Body() data:{forId:number,valor:number}):Promise<Response>{
        try{
            
            if(!data.forId){
                this.logger.error("You need to input the user id!");
                return res.status(401).json({server:"You need to input the user id!"});
            };

            if(!data.valor){
                this.logger.error("You need to input the value!");
                return res.status(402).json({server:"You need to input the value!"});
            };

            
            const novaTransfer = await this.moneyService.Transfer(data);
            
            this.logger.log(novaTransfer);
            
            if(!novaTransfer){
                this.logger.error("Colossal error, please try again later!");
                return res.status(500).json({server:"Colossal error, please try again later!"});
            };

            return res.status(202).send(novaTransfer);

        }catch(err){
            this.logger.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    @Post("/v1/deposit")
    private async depositMoney(@Res()res:Response, @Body()data:{forId:number, valor:number}):Promise<Response>{
        try{

            if(!data.forId){
                this.logger.error("You need to input the user id!");
                return res.status(401).json({server:"You need to input the user id!"});
            };

            if(!data.valor){
                this.logger.error("You need to input the value!");
                return res.status(402).json({server:"You need to input the value!"});
            };

            const depositMoney = await this.moneyService.DepositMoney(data);

            this.logger.log(depositMoney);

            return res.status(202).send(depositMoney);

        }catch(err){
            this.logger.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    @Post("/v1/withdraw")

    private async withDrawMoney(@Res()res:Response, @Body() data:{forId:number, valor:number}):Promise<Response>{
        try{
            if(!data.forId){
                this.logger.error("You need to input the user id!");
                return res.status(401).json({server:"You need to input the user id!"});
            };

            if(!data.valor){
                this.logger.error("You need to input the value!");
                return res.status(402).json({server:"You need to input the value!"});
            };

            const novoWithdraw = await this.moneyService.WithDrawMoney(data);

            if(!novoWithdraw){
                this.logger.error("Crazy error, please try again later!");
                return res.status(500).json({server:"Crazy error, please try again later!"});
            };

            this.logger.log(novoWithdraw);
            return res.status(202).send(novoWithdraw);

        }catch(err){
            this.logger.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    @Post("/v1")
    private async postATransacao(@Res() res:Response, @Body()data:CreateTransacao):Promise<Response>{
        try{
            const criaNovaTransacao = await this.moneyService.Insert2(data);
            this.logger.log(criaNovaTransacao);
            return res.status(201).send(criaNovaTransacao)
        } catch(err){
            this.logger.error(err);
            return res.status(500).json({server:`${err}`});
        };
    };

    
};