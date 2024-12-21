import { Controller, Get, Post, Res, Delete, Put, Body, Param, Query } from "@nestjs/common";
import { MoneyService } from "./money.service";
import { Response } from "express";
import { CreateTransacao } from "./DTO/money.dto";

@Controller("/task")
export class MoneyController{
    constructor(private readonly moneyService:MoneyService){};

    @Post("/v1")
    public async postATransacao(@Res() res:Response, @Body()data:CreateTransacao):Promise<Response>{
        try{
            const criaNovaTransacao = await this.moneyService.Insert(data);
            return res.status(201).send(criaNovaTransacao)
        } catch(err){
            console.error(err);
            return res.status(500).json({server:err});
        };
    };
};