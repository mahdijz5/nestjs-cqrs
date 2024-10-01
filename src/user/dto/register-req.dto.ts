import { ApiCustomeProperty } from "../../common/decorators"

export class RegisterReqDto {

    @ApiCustomeProperty({
        example : "username"
    })
    username : string
    
    @ApiCustomeProperty({
        example : "password"
    })
    password : string
}