import { CreateTodoListReqDto } from "../../../todo-list/dto";
import { UpdateTodoListReqDto } from "../../../todo-list/dto/update-todolist-req.dto";

export class UpdateTodoListCommand{
    constructor( public readonly id : string , public readonly updateTodoListReqDto : UpdateTodoListReqDto){}
}