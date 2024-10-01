 import { CreateTodoItemReqDto } from "../../../todo-list/dto/create-todoItem-req.dto";
 
 
export class CreateTodoItemCommand {
    constructor(public readonly createTodoItemReqDto: CreateTodoItemReqDto) {
        
    }
}