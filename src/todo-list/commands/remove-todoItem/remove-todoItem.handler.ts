import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
  import { Types } from "mongoose";
import { TodoItemRepository } from "src/todo-list/db";
import { RemoveTodoItemCommand } from "./remove-todoItem.command";


@CommandHandler(RemoveTodoItemCommand)
export class RemoveTodoItemHandler implements ICommandHandler<RemoveTodoItemCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository,
     ) { }
    async execute({id}: RemoveTodoItemCommand): Promise<void> {
        const todoItem = await this.todoItemRepository.removeOne({ _id: new Types.ObjectId(id) })
        await this.todoItemRepository.updateMany({ todoListId: new Types.ObjectId(todoItem.getTodolistId), priority : {$gte  :todoItem.getPriority }}, {$inc : {priority  : -1}})
        todoItem.delete()

        todoItem.commit()
        return
    }
}