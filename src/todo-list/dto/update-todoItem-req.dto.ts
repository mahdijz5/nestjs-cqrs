import { OmitType, PartialType } from "@nestjs/swagger"
import { ApiCustomeProperty } from "../../common/decorators"
import { CreateTodoItemReqDto } from "./create-todoItem-req.dto"

export class UpdateTodoItemReqDto  extends PartialType(OmitType(CreateTodoItemReqDto,["priority","todoListId"])){
 
}