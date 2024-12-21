import { Controller, Get, Post, Res, Delete, Put, Body, Param, Query, Logger } from "@nestjs/common";
import { MoneyService } from "./money.service";
import { Response } from "express";
import { CreateTransacao } from "./DTO/money.dto";

@Controller("/transfer")
export class MoneyController{
    private readonly logger = new Logger(MoneyController.name);
    constructor(private readonly moneyService:MoneyService){};

    @Post("/v1")
    public async postATransacao(@Res() res:Response, @Body()data:CreateTransacao):Promise<Response>{
        try{
            const criaNovaTransacao = await this.moneyService.Insert2(data);
            return res.status(201).send(criaNovaTransacao)
        } catch(err){
            this.logger.error(err);
            return res.status(500).json({server:err});
        };
    };
};