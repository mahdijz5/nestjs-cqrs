import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JWTData = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
        return context.switchToHttp().getRequest().user;  
    }
    if (context.getType() === 'rpc') {
        return context.switchToRpc().getData().user; 
    }
});
