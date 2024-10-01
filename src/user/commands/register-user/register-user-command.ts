import { RegisterReqDto } from "../../../user/dto";

 
 
export class RegisterUserCommand {
    constructor(public readonly registerUserReq: RegisterReqDto) {
        
    }
}