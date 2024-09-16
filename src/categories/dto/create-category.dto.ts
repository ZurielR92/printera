import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @ApiProperty({ name:'name', type:'string', example:'Vinilo Blanco', required:true })
    name:               string

    @IsString()
    @IsOptional()
    @ApiProperty({ name:'description', type:'string', example:'', required:false})
    description:        string

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ name:'is_active', type:'boolean', example:true, required:false, default:true})
    is_active: boolean

}
