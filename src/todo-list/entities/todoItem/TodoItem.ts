import { AggregateRoot } from "@nestjs/cqrs";

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
        // this.apply()
    }

    update() {
        // this.apply()
    }
    

}