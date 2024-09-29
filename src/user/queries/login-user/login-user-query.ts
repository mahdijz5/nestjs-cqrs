import { LoginReqDto } from "src/user/dto";

export class LoginUserQuery {
    constructor(public readonly loginReqDto: LoginReqDto) {
        
    }
}