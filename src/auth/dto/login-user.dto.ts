import { ApiProperty } from "@nestjs/swagger";
import { IsString, isString } from "class-validator";



export class LoginUserDto {
    @IsString()
    @ApiProperty({name:'phone', required:true, default:'3137082992'})
    phone:                  string

    @IsString()
    @ApiProperty({name:'password', required:true, default:'123123'})
    password:                string
}