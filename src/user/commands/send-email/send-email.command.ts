import {  SendEmailReqDto } from "src/user/dto";

 
export class SendEmailCommand {
    constructor(public readonly sendEmailReqDto: SendEmailReqDto) {
        
    }
}