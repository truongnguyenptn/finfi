import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response {
    success: boolean;
    data: any;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response> {
        return next.handle().pipe(
            map((data) => {
                return {
                    success: true,
                    data,
                };
            }),
        );
    }
}
