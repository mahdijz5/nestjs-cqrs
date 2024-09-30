import { PartialType } from "@nestjs/swagger";
import { CreateTodoListReqDto } from "./create-todolist-req.dto";

export class UpdateTodoListReqDto extends PartialType(CreateTodoListReqDto) {
    
}