import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { TodoListLogEvent } from "./todolist.event";

@EventsHandler(TodoListLogEvent)
export class TodoListLogEventHandler implements IEventHandler<TodoListLogEvent> {
    private readonly logger = new Logger(TodoListLogEventHandler.name);

    async handle({ event, todoList }: TodoListLogEvent) {
        this.logger.debug(`Handling TodoList [${event}] event: ${JSON.stringify(todoList)}`);
    }
}