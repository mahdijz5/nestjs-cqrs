import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Types } from "mongoose";
import { TodoItemRepository } from "src/todo-list/db";
import { UpdatePriorityCommand } from "./update-priority.command";


@CommandHandler(UpdatePriorityCommand)
export class UpdatePriorityTodoItemHandler implements ICommandHandler<UpdatePriorityCommand> {
    constructor(
        private readonly todoItemRepository: TodoItemRepository,
        private readonly eventPublisher: EventPublisher,

    ) { }
    async execute({ id, updateTodoItemReqDto }: UpdatePriorityCommand): Promise<void> {
        const { priority } = updateTodoItemReqDto
        const item = await this.todoItemRepository.findOneById(id)

        const isExist = await this.todoItemRepository.findOneByCondition({ todoListId: new Types.ObjectId(item.getTodolistId), priority })
        if (isExist) {
            await this.todoItemRepository.updateMany({ todoListId: new Types.ObjectId(item.getTodolistId), priority: { $gte: priority } }, { $inc: { priority: +1 } })
        }
        const todoItem = this.eventPublisher.mergeObjectContext(
            await this.todoItemRepository.updateOne({ _id: new Types.ObjectId(id) }, { ...updateTodoItemReqDto })
        )
        todoItem.update()

        todoItem.commit()
        return
    }
}