import { LoginReqDto } from "../../../user/dto";

export class LoginUserQuery {
    constructor(public readonly loginReqDto: LoginReqDto) {
        
    }
}