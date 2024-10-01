import { ApiCustomeProperty } from "../../common/decorators";

export class LoginReqDto {
    @ApiCustomeProperty({
        example : "username"
    })
    username : string
    
    @ApiCustomeProperty({
        example : "password"
    })
    password : string
}