import { Injectable } from "@nestjs/common";
import { Prisma, Tipo, Transacoes } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { PrismaService } from "prisma/prisma.service";



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
    constructor(private readonly pr:PrismaService){
        this.prisma = pr.transacoes;
    };

    public async Insert({name,valor,createdById,tipo}:MoneyThings):Promise<Transacoes | null>{
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
                console.error("We failed to create the transaction");
                return null;
            };


            return tentaCriar;
        } catch(err){
            console.error(err);
            return null;
        };
    };

};