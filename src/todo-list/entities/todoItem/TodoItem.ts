import { AggregateRoot } from "@nestjs/cqrs";
import { EventType } from "../../../common/enums/event-type.enum";
import { TodoItemLogEvent } from "../../../todo-list/events/todoItem-logger/todoItem.event";

export class TodoItem extends AggregateRoot {
    constructor(
        private readonly _id: string,
        private readonly todoListId: string,
        private readonly title: string,
        private readonly description: string,
        private readonly priority: number,
    ) {
        super()
    }

    get getID() {
        return this._id
    }

    get getTodolistId() {
        return this.todoListId
    }

    get getTitle() {
        return this.title
    }


    get getDescription() {
        return this.description
    }
    
    get getPriority() {
        return this.priority
    }

    
    delete() {
        this.apply(new TodoItemLogEvent(EventType.DELETE,this))
    }

    update() {
        this.apply(new TodoItemLogEvent(EventType.UPDATE,this))
    }
    

}