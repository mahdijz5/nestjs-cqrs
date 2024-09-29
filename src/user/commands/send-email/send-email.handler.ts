import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { SendEmailCommand } from "./send-email.command";
import { Logger } from "@nestjs/common";

@CommandHandler(SendEmailCommand)
export class SendEmailHandler implements ICommandHandler<SendEmailCommand> {
    constructor() { }
    private readonly logger = new Logger(SendEmailHandler.name);

    async execute({ sendEmailReqDto }: SendEmailCommand): Promise<void> {


        this.logger.log(`Sending welcome email : ${JSON.stringify(sendEmailReqDto)}`)

        // Send email logic

        return
    }
}