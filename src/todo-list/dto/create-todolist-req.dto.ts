import { ApiCustomeProperty } from "src/common/decorators";

export class CreateTodoListReqDto {
    @ApiCustomeProperty({
        example : "title",
    })    
    title : string


    userId : string

}