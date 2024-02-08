import { Injectable } from '@angular/core';
import {ClientCallService} from "./client-call.service";
import {MedianServiceCallType} from "./request-middleware.service.type";
import {catchError, Observable, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestMiddlewareService {

  constructor(private clientCallService: ClientCallService) { }

  wrapperCall(callType: MedianServiceCallType = MedianServiceCallType.GET_SAMPLE): Observable<object>{
    return this.clientCallService[callType]().pipe(catchError((err: HttpErrorResponse) => {
      console.log('err caught here -', err);

      if(err.status===400){
        console.log('400 caught')
      }


      // return throwError(() => new Error(err));
      return throwError(() => new Error(JSON.stringify(err)));
      // return of(err);
    })) as Observable<object>;
  }
}
