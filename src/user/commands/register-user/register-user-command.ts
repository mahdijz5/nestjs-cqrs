import { CreateCamperRequest } from "src/campers/dto/request/create-camper-request.dto";
import { RegisterReqDto } from "src/user/dto";

 
export class RegisterUserCommand {
    constructor(public readonly registerUserReq: RegisterReqDto) {
        
    }
}