import { CreateTodoListReqDto } from "src/todo-list/dto";
 
 
export class CreateTodoListCommand {
    constructor(public readonly createTodoListReqDto: CreateTodoListReqDto) {
        
    }
}