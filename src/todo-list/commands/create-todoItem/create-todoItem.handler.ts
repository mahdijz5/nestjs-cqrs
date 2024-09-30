import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoItemCommand } from "./create-todoItem.command";
import { TodoItemRepository, TodoListRepository } from "src/todo-list/db";
import { NotFoundException } from "@nestjs/common";
import { ERROR } from "src/common/enums";
import { TodoItemFactory } from "src/todo-list/entities/todoItem/todoitem.factory";
import { Types } from "mongoose";


@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemHandler implements ICommandHandler<CreateTodoItemCommand> {
    constructor(
        private readonly todoItemFactory: TodoItemFactory,
        private readonly eventPublisher: EventPublisher,
        private readonly todoListRepository: TodoListRepository,
        private readonly todoItemRepository: TodoItemRepository
    ) { }
    async execute({ createTodoItemReqDto }: CreateTodoItemCommand): Promise<void> {
        const { description,   title, todoListId } = createTodoItemReqDto

        const isExist = this.todoListRepository.findOneById(todoListId)
        if (!isExist) throw new NotFoundException(ERROR.NOT_FOUND)

        const items = await this.todoItemRepository.findAll({ todoListId: new Types.ObjectId(todoListId) })
    console.log(items)
        const camper = this.eventPublisher.mergeObjectContext(
            await this.todoItemFactory.create(title, description, items.length+1, todoListId)
        )

        camper.commit()

        return
    }
}