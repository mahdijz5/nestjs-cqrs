import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
 import { CamperFactory } from "src/campers/camper.factory";
import { RegisterUserCommand } from "./register-user-command";
import { UserFactory } from "src/user/user.factory";
 
@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(private readonly userFactory: UserFactory, private readonly eventPublisher: EventPublisher) { }
    async execute({ registerUserReq }: RegisterUserCommand): Promise<void> {
        const {password,username} = registerUserReq

        const camper = this.eventPublisher.mergeObjectContext(
            await this.userFactory.create(username,password)
        )
        camper.commit()
        return
    }
}