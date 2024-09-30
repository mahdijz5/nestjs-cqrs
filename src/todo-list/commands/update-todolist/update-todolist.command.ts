import { CreateTodoListReqDto } from "src/todo-list/dto";
import { UpdateTodoListReqDto } from "src/todo-list/dto/update-todolist-req.dto";

export class UpdateTodoListCommand{
    constructor( public readonly id : string , public readonly updateTodoListReqDto : UpdateTodoListReqDto){}
}