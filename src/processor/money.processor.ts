import { Process, Processor } from "@nestjs/bull";
import { Body, Logger, Res } from "@nestjs/common";
import { Job } from "bull";
import { Response } from "express";
import { TRANSACOES_QUEUE } from "src/constants/constansts";
import { CreateTransacao } from "src/money/DTO/money.dto";

import { MoneyService } from "src/money/money.service";

@Processor(TRANSACOES_QUEUE)
export class MoneyProcessor{
    constructor(private readonly moneyService:MoneyService, private readonly logger: Logger){};
    @Process()
    private async postTransacao(job:Job<CreateTransacao>){
        Logger.log("Creating job!");
        Logger.log(`Job: ${JSON.stringify(job.data)}`);
        this.moneyService.Insert(job.data);
        Logger.log(`Job completead: ${JSON.stringify(job.data)}`);
    };
};