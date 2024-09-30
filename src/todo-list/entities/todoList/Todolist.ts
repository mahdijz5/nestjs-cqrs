import { AggregateRoot } from "@nestjs/cqrs";
 
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
    
}