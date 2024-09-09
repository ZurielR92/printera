import { IsArray, IsIn, IsObject, IsOptional, IsString } from "class-validator";
import { ElementTypes } from "src/common/enums/element-type.enum";
import { ProcessTypes } from "src/common/enums/proces_type.enum";
import { UnitMeausure } from "src/common/enums/unit_meausure.enum";


export class CreateElementDto {


    @IsString()
    name:                           string

    @IsIn([ElementTypes.MATERIAL, ElementTypes.SERVICIO])
    type:                           string

    @IsIn([ProcessTypes.CORTE_LASER,ProcessTypes.GRAN_FORMATO,ProcessTypes.IMPRESION_LASER,ProcessTypes.LITOGRAFIA])
    process_type:                   string

    @IsIn([UnitMeausure.CM2, UnitMeausure.HRS, UnitMeausure.M2, UnitMeausure.MIN, UnitMeausure.UND])
    unit_meausure:                  string

    @IsString()
    @IsOptional()
    description:                    string

    @IsArray()
    costs: {
        title:  string,
        amount: number,
    }[]

}
