import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class UserPipe implements PipeTransform{
    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToInstance(metadata.metatype, value);
        
        const err = await validate(object);

        if(err.length > 0){
            return new BadRequestException;
        };

        return object;
    };  
};