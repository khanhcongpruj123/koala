import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { OryClient } from './ory.config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise<boolean>((resolve, rejects) => {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        // 💡 See this condition
        resolve(true);
      } else {
        const request = context.switchToHttp().getRequest();
        OryClient.toSession({
          cookie: request.headers.cookie,
          xSessionToken: request.headers['x-session-token'],
        })
          .then((res: any) => {
            request['authSession'] = res.data;
            resolve(true); // if success, resolve true when session is valid
          })
          .catch((err: Error) => {
            rejects(new UnauthorizedException()); // throw this error to display 401 code
          });
      }
    });
  }
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
