import { ApiCustomeProperty } from "src/common/decorators"

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