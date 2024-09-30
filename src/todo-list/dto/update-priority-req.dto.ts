import { PickType } from "@nestjs/swagger";
import { CreateTodoItemReqDto } from "./create-todoItem-req.dto";

export class UpdatePriorityReqDto extends PickType(CreateTodoItemReqDto,["priority"]) {
    
}