import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ERROR, RequestStatus } from '../enums';
import { MongoServerError   } from 'mongodb';
import { STATUS_CODES } from 'http';


@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const reply = host.switchToHttp().getResponse();
         let status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
        let response = exception.response || ERROR.INTERNAL_SERVER_ERROR;

        if (exception?.name == "CastError" && exception?.kind == "ObjectId") {
            status = HttpStatus.BAD_REQUEST
            response = ERROR.MONGO_INCORRECT_ID
        }

        if (exception?.name === 'MongoServerError' && exception?.code === 11000) {
            status = HttpStatus.BAD_REQUEST
            response = ERROR.ALREADY_EXISTS
        }


        if (exception instanceof HttpException) {
            status = exception.getStatus();
            response = exception.getResponse();
        }
 
        reply.status(status).send({
            status: RequestStatus.FAILURE,
            statusCode: status,
            errors: response,
            timestamp: new Date(),
        });
    }
 

}
