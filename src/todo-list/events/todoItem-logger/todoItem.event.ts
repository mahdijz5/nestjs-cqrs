import { EventType } from "src/common/enums/event-type.enum";
import { TodoItem } from "src/todo-list/entities/todoItem/TodoItem";
 
 
export class TodoItemLogEvent {
    constructor(public  readonly event : EventType,public readonly todoItem :TodoItem){}
}