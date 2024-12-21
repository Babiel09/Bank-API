import { Injectable, Logger } from "@nestjs/common";
import { ExternalExceptionsHandler } from "@nestjs/core/exceptions/external-exceptions-handler";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserAuth{
    private readonly logger = new Logger(UserAuth.name);
    constructor(private readonly jwtService:JwtService){};

    public createNewToken(argument:any):string{
        try{
            const novoArgs = this.jwtService.sign({argument});
            if(!novoArgs){
                this.logger.error("Error to make the argument a JWT token!");
                throw new ExternalExceptionsHandler();
            };
            return novoArgs;
        } catch(err){
            this.logger.error(err);
            throw new ExternalExceptionsHandler();
        };
    };

    public async checkTheToken(token:string):Promise<object>{
        try{
            const verificaToken = await this.jwtService.verify(token);

            if(!verificaToken){
                this.logger.error("Error to verify the JWT token!");
                throw new ExternalExceptionsHandler();
            };

            return verificaToken;
        }catch(err){
            this.logger.error(err);
            throw new ExternalExceptionsHandler();
        };
    };

    public async makeTheTokenAnArgument(token:string){
        try{
            this.checkTheToken(String(token));
            await this.jwtService.decode(token)
        }catch(err){
            this.logger.error(err);
            throw new ExternalExceptionsHandler();
        };
    };

};