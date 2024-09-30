import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { TodoListRepository, TodoListSchemaFactory } from "src/todo-list/db";
import { Types } from "mongoose";
import { RemoveTodoListCommand } from "./remove-todolist.command";


@CommandHandler(RemoveTodoListCommand)
export class RemoveTodoListHandler implements ICommandHandler<RemoveTodoListCommand> {
    constructor(
        private readonly todoListRepository: TodoListRepository,
        private readonly eventPublisher: EventPublisher
    ) { }
    async execute({ id }: RemoveTodoListCommand): Promise<void> {
        const todoList = await this.todoListRepository.removeOne({ _id: new Types.ObjectId(id) })
        todoList.delete()

        todoList.commit()
        return
    }
}