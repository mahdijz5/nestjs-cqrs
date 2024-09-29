 import { RegisterReqDto } from "src/user/dto";

 
export class RegisterUserCommand {
    constructor(public readonly registerUserReq: RegisterReqDto) {
        
    }
}