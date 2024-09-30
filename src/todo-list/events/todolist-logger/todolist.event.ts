import { EventType } from "src/common/enums/event-type.enum";
import { TodoList } from "src/todo-list/entities/todoList/Todolist";

 
export class TodoListLogEvent {
    constructor(public  readonly event : EventType,public readonly todoList :TodoList){}
}