import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { TRANSACOES_QUEUE } from "src/constants/constansts";

@Processor(TRANSACOES_QUEUE)
export class MoneyProcessor{
    @Process()
    private async postTransacao(job:Job){
        
    };
};