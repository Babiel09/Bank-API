import { Injectable } from "@nestjs/common";
import { ExternalExceptionsHandler } from "@nestjs/core/exceptions/external-exceptions-handler";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserAuth{
    constructor(private readonly jwtService:JwtService){};

    public createNewToken(argument:any):string{
        try{
            const novoArgs = this.jwtService.sign({argument});
            if(!novoArgs){
                console.error("Error to make the argument a JWT token!");
                throw new ExternalExceptionsHandler();
            };
            return novoArgs;
        } catch(err){
            console.error(err);
            throw new ExternalExceptionsHandler();
        };
    };

    public async checkTheToken(token:string):Promise<object>{
        try{
            const verificaToken = await this.jwtService.verify(token);

            if(!verificaToken){
                console.error("Error to verify the JWT token!");
                throw new ExternalExceptionsHandler();
            };

            return verificaToken;
        }catch(err){
            console.error(err);
            throw new ExternalExceptionsHandler();
        };
    };

    public async makeTheTokenAnArgument(token:string){
        try{
            this.checkTheToken(String(token));
            await this.jwtService.decode(token)
        }catch(err){
            console.error(err);
            throw new ExternalExceptionsHandler();
        };
    };

};