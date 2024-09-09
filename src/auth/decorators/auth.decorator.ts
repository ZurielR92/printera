import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common"
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { roles } from "src/common/enums/roles.enum";



export const Auth = ( ...roles:roles[] ) => {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard)
    )
}