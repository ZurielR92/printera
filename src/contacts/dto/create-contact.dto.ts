import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, isBoolean } from "class-validator";

export class CreateContactDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name:'name', 
        description:'Nombre del nuevo contacto',
        required:true,
        title:'Nombre del contacto',
        default:'Jhon Doe'
    })
    name:                   string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        name:'phone',
        description:'Numero de teléfono del contacto',
        title:'Numero de teléfono del contacto'
    })
    phone:                  string

    @IsEmail()
    @IsOptional()
    email:                  string

    @IsOptional()
    @IsBoolean()
    is_supplier:            boolean

    @IsOptional()
    @IsBoolean()
    is_customer:            boolean

}
