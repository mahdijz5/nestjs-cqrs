import { Module } from '@nestjs/common';
import { TodoListController } from './todo-list.controller';
  import { todoListCommandHandlers } from './commands';
import { TodoItemRepository, TodoItemSchema, TodoItemSchemaFactory, TodoListRepository, TodoListSchema, TodoListSchemaFactory } from './db';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { TodoListFactory } from './entities/todoList/todolist.factory';
import { TodoItemFactory } from './entities/todoItem/todoitem.factory';
import { CqrsModule } from '@nestjs/cqrs';
import { TodoItemController } from './todo-item.controller';
import { todoListQueryHandlers } from './queries';
import { todoListEventHandlers } from './events';
@Module({
  imports : [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: TodoListSchema.name,
        schema: SchemaFactory.createForClass(TodoListSchema)
      },
      {
        name: TodoItemSchema.name,
        schema: SchemaFactory.createForClass(TodoItemSchema)
      }
    ])
  ],
  controllers: [TodoListController,TodoItemController],
  providers : [
    TodoListFactory,
    TodoItemFactory,
    TodoItemSchemaFactory,
    TodoListSchemaFactory,
    TodoListRepository,
    TodoItemRepository,
    TodoListSchemaFactory,
    ...todoListCommandHandlers,
    ...todoListQueryHandlers,
    ...todoListEventHandlers
  ]
})
export class TodoListModule {}
