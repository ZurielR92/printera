import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";




export class RegisterUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ name:'name', required:true })
    name:                   string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ name:'phone', required:true })
    phone:                  string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ name:'password', required:true, minLength:6 })
    password:               string
}