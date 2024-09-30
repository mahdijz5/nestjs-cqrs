import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
 import { Logger } from "@nestjs/common";
import { TodoItemLogEvent } from "./todoItem.event";
   
@EventsHandler(TodoItemLogEvent)
export class TodoItemLogEventHandler implements IEventHandler<TodoItemLogEvent> {
    private readonly logger = new Logger(TodoItemLogEventHandler.name); 

    async handle({event,todoItem}: TodoItemLogEvent) {
        this.logger.debug(`Handling TodoList [${event}] event: ${JSON.stringify(todoItem)}`);
    }
}