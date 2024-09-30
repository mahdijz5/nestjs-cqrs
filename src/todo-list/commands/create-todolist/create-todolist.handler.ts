import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateTodoListCommand } from "./create-todolist.command";
import { TodoListFactory } from "src/todo-list/entities/todoList/todolist.factory";


@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler implements ICommandHandler<CreateTodoListCommand> {
    constructor(private readonly todoListFactory: TodoListFactory, private readonly eventPublisher: EventPublisher) { }
    async execute({ createTodoListReqDto }: CreateTodoListCommand): Promise<void> {
        const { title, userId } = createTodoListReqDto
        const camper = this.eventPublisher.mergeObjectContext(
            await this.todoListFactory.create(title, userId)
        )
        camper.commit()
        return
    }
}