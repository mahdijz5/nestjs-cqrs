import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTodoItemCommand } from "./update-todoItem.command";
 import { Types } from "mongoose";
import { TodoItemRepository } from "src/todo-list/db";


@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler implements ICommandHandler<UpdateTodoItemCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository,
        private readonly eventPublisher: EventPublisher,
     ) { }
    async execute({id,updateTodoItemReqDto}: UpdateTodoItemCommand): Promise<void> {
        const todoItem =  this.eventPublisher.mergeObjectContext(await this.todoItemRepository.updateOne({ _id: new Types.ObjectId(id) }, { ...updateTodoItemReqDto }))
        
        
        todoItem.update()

        todoItem.commit()
        return
    }
}