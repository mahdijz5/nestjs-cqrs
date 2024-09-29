import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { map, Observable } from "rxjs";
import { UserRegisterEvent } from "../events/register-user/register-user-event";
import { SendEmailCommand } from "../commands/send-email/send-email.command";

@Injectable()
export class userSagas {
  @Saga()
  userRegistered = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserRegisterEvent),
      map((event) => new SendEmailCommand({...event.registerUserEventReqDto,content : "",subject : ""})),
    );
  }
}