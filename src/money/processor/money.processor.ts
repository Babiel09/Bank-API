import { Process, Processor } from "@nestjs/bull";
import { Body, Logger, Res } from "@nestjs/common";
import { Job } from "bull";
import { Response } from "express";
import { TRANSACOES_QUEUE } from "src/constants/constansts";
import { CreateTransacao } from "src/money/DTO/money.dto";

import { MoneyService } from "src/money/money.service";

@Processor(TRANSACOES_QUEUE)
export class MoneyProcessor{
    private readonly logger = new Logger(MoneyProcessor.name);
    constructor(private readonly moneyService:MoneyService){};
    @Process("test")
    private async postTransacao(job:Job<CreateTransacao>){
        this.logger.log("Creating job!");
        this.logger.log(`Job: ${JSON.stringify(job.data)}`);
        this.moneyService.Insert2(job.data);
        this.logger.log(`Job completead: ${JSON.stringify(job.data)}`);
    };
    @Process("transfer")
    private async TransferInprocess(job:Job){
      this.moneyService.Transfer(job.data);  
    };
}; 