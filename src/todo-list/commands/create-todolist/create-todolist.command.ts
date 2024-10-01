import { CreateTodoListReqDto } from "../../../todo-list/dto";
 
 
export class CreateTodoListCommand {
    constructor(public readonly createTodoListReqDto: CreateTodoListReqDto) {
        
    }
}