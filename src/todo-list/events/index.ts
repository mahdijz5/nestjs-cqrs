import { TodoItemLogEventHandler } from "./todoItem-logger/todoItem.handler";
import { TodoListLogEventHandler } from "./todolist-logger/todolist.handler";

export const todoListEventHandlers = [TodoListLogEventHandler,TodoItemLogEventHandler]