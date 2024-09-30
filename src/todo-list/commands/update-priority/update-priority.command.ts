import { UpdatePriorityReqDto } from "src/todo-list/dto";

export class UpdatePriorityCommand {
    constructor(public id: string, public updateTodoItemReqDto: UpdatePriorityReqDto) { }
}