import { CreateTodoItemHandler } from "./create-todoItem/create-todoItem.handler";
import { CreateTodoListHandler } from "./create-todolist/create-todolist.handler";
import { RemoveTodoItemHandler } from "./remove-todoItem/remove-todoItem.handler";
import { RemoveTodoListHandler } from "./remove-todolist/remove-todolist.handler";
import { UpdatePriorityTodoItemHandler } from "./update-priority/update-priority.handler";
import { UpdateTodoItemHandler } from "./update-todoItem/update-todoItem.handler";
import { UpdateTodoListHandler } from "./update-todolist/update-todolist.handler";

export const todoListCommandHandlers = [CreateTodoListHandler, UpdateTodoListHandler, RemoveTodoListHandler, CreateTodoItemHandler,UpdateTodoItemHandler,RemoveTodoItemHandler,UpdatePriorityTodoItemHandler]