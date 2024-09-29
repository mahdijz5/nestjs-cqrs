import { RegisterUserEventReqDto } from "../dto";

export class UserRegisterEvent {
    constructor(public readonly registerUserEventReqDto :RegisterUserEventReqDto){}
}