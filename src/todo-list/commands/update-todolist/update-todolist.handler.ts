import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTodoListCommand } from "./update-todolist.command";
import { TodoListRepository, TodoListSchemaFactory } from "src/todo-list/db";
import { Types } from "mongoose";


@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler implements ICommandHandler<UpdateTodoListCommand> {
    constructor(
        private readonly todoListRepository: TodoListRepository,
        private readonly eventPublisher: EventPublisher,

    ) { }
    async execute({ id, updateTodoListReqDto }: UpdateTodoListCommand): Promise<void> {

        const todoList =
            this.eventPublisher.mergeObjectContext(
                await this.todoListRepository.updateOne({ _id: new Types.ObjectId(id) }, { ...updateTodoListReqDto })
            )
        todoList.update()

        todoList.commit()
        return
    }
}