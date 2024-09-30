 import { CreateTodoItemReqDto } from "src/todo-list/dto/create-todoItem-req.dto";
import { RegisterReqDto } from "src/user/dto";

 
export class CreateTodoItemCommand {
    constructor(public readonly createTodoItemReqDto: CreateTodoItemReqDto) {
        
    }
}