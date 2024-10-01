import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RegisterUserCommand } from "./register-user-command";
import { UserFactory } from "../../user.factory";


@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
    constructor(
        private readonly userFactory: UserFactory, 
        private readonly eventPublisher: EventPublisher
    ) { }
    async execute({ registerUserReq }: RegisterUserCommand): Promise<void> {
        const { password, username } = registerUserReq

        const user = this.eventPublisher.mergeObjectContext(
            await this.userFactory.create(username, password)
        )
        user.commit()
        return
    }
}