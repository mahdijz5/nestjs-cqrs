import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { RegisterUserEventReqDto } from "../dto";
import { Logger } from "@nestjs/common";
import { UserRegisterEvent } from "./register-user-event";
 
@EventsHandler(UserRegisterEvent)
export class RegisterUserEventHandler implements IEventHandler<UserRegisterEvent> {
    private readonly logger = new Logger(RegisterUserEventHandler.name); 

    async handle(event: UserRegisterEvent) {
        this.logger.log(`Handling user registration event: ${JSON.stringify(event)}`);
        this.logger.log("User registered successfully"); 
    }
}