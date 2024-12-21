import { InjectQueue } from "@nestjs/bull";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Prisma, Tipo, Transacoes } from "@prisma/client";
import { DefaultArgs } from "@Prisma/client/runtime/library";
import { Queue } from "bull";
import { PrismaService } from "prisma/prisma.service"
import { TRANSACOES_QUEUE } from "src/constants/constansts";
import { CreateTransacao } from "./DTO/money.dto";
import { UserService } from "src/user/user.service";



export interface MoneyThings{
    id:number;
    name:string;
    valor:number;
    forId:number;
    tipo: Tipo;
};

@Injectable()
export class MoneyService{
    private readonly prisma2: Prisma.TransacoesDelegate<DefaultArgs>;
    private readonly logger2 = new Logger(MoneyService.name);
    constructor(
       @Inject()private readonly pr2:PrismaService,
        @InjectQueue(TRANSACOES_QUEUE) private readonly transacoes:Queue,
     ){
        this.prisma2 = pr2.transacoes; 
    };

    public async Insert2({name,valor,forId,tipo}:CreateTransacao):Promise<Transacoes | null>{
        try{    
            const tentaCriar = await this.prisma2.create({
                data:{
                    name:name,
                    valor:valor,
                    forId:forId,
                    tipo:tipo
                },
            });

            if(!tentaCriar){
                this.logger2.error("We failed to create the transaction");
                return null;
            };

            this.logger2.log("Processando job");

           const job = await this.transacoes.add(TRANSACOES_QUEUE,{
                transactionId:tentaCriar.id,
                transactionName:tentaCriar.name,
                transactionValue:tentaCriar.valor,
                transactionFor:tentaCriar.forId,
                transactionType:tentaCriar.tipo,
            });

            this.logger2.log(`Job foi carregado = \n${JSON.stringify(job)}\n`);

            return tentaCriar;

        } catch(err){
            this.logger2.error(err);
            return null;
        };
    };

};