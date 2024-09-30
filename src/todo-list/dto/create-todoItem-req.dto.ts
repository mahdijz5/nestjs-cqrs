import { ApiCustomeProperty } from "src/common/decorators"

export class CreateTodoItemReqDto {
    @ApiCustomeProperty({ example: "Example" })
    title: string
    @ApiCustomeProperty({ example: "Example" })
    description: string
    @ApiCustomeProperty({ example: 1 })
    priority: number
    @ApiCustomeProperty({ example: "Example" })
    todoListId: string
}