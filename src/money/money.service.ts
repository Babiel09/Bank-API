import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Prisma, Tipo, Transacoes } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Queue } from "bull";
import { PrismaService } from "prisma/prisma.service";
import { TRANSACOES_QUEUE } from "src/constants/constansts";
import { CreateTransacao } from "./DTO/money.dto";



export interface MoneyThings{
    id:number;
    name:string;
    valor:number;
    createdById:number;
    tipo: Tipo;
};

@Injectable()
export class MoneyService{
    private readonly prisma: Prisma.TransacoesDelegate<DefaultArgs>;
    private readonly logger = new Logger(MoneyService.name);
    constructor(private readonly pr:PrismaService, @InjectQueue(TRANSACOES_QUEUE) private readonly transacoes:Queue){
        this.prisma = pr.transacoes;
    };

    public async Insert({name,valor,createdById,tipo}:CreateTransacao):Promise<Transacoes | null>{
        try{    
            const tentaCriar = await this.prisma.create({
                data:{
                    name:name,
                    valor:valor,
                    createdById:createdById,
                    tipo:tipo
                },
            });

            if(!tentaCriar){
                this.logger.error("We failed to create the transaction");
                return null;
            };

            this.logger.log("Processando job");

           const job = await this.transacoes.add(TRANSACOES_QUEUE,{
                transactionId:tentaCriar.id,
                transactionName:tentaCriar.name,
                transactionValue:tentaCriar.valor,
                transactionCreatedBy:tentaCriar.createdById,
                transactionType:tentaCriar.tipo,
            });

            this.logger.log(`Job foi carregado = ${JSON.stringify(job)}`);

            return tentaCriar;

        } catch(err){
            this.logger.error(err);
            return null;
        };
    };

};