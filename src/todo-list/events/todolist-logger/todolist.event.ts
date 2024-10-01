import { EventType } from "../../../common/enums/event-type.enum";
import { TodoList } from "../../../todo-list/entities/todoList/Todolist";

 
export class TodoListLogEvent {
    constructor(public  readonly event : EventType,public readonly todoList :TodoList){}
}