import { UpdateTodoItemReqDto } from "../../../todo-list/dto/update-todoItem-req.dto";

export class UpdateTodoItemCommand {
    constructor(public id : string,public  updateTodoItemReqDto : UpdateTodoItemReqDto) {}
}