import { AggregateRoot } from "@nestjs/cqrs";
 
export class User extends AggregateRoot {
    constructor(
        private readonly _id: string,
        private readonly username: string,
        private readonly password: string,
    ) {
        super()
    }
    
    get getID() {
        return this._id
    }

    get getUsername() {
        return this.username
    }

    get getPassword() {
        return this.password
    }
    
}