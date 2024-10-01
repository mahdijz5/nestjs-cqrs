import { UpdatePriorityReqDto } from "../../../todo-list/dto";

export class UpdatePriorityCommand {
    constructor(public id: string, public updateTodoItemReqDto: UpdatePriorityReqDto) { }
}