import {  SendEmailReqDto } from "../../../user/dto";

 
export class SendEmailCommand {
    constructor(public readonly sendEmailReqDto: SendEmailReqDto) {
        
    }
}