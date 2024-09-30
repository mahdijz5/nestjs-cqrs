import { AggregateRoot } from "@nestjs/cqrs";
import { EventType } from "src/common/enums/event-type.enum";
import { TodoListLogEvent } from "src/todo-list/events/todolist-logger/todolist.event";
 
export class TodoList extends AggregateRoot {
    constructor(
        private readonly _id: string,
        private readonly title: string,
        private readonly userId: string,
    ) {
        super()
    }
    
    get getID() {
        return this._id
    }

    get getTitle() {
        return this.title
    }

    get getUserId() {
        return this.userId
    }


    delete() {
        this.apply(new TodoListLogEvent(EventType.DELETE,this))

    }

    update() {
         this.apply(new TodoListLogEvent(EventType.UPDATE,this))
    }
    
}