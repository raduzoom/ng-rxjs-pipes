import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientCallService {

  serverBaseUri = 'http://localhost:3513/'
  constructor(private httpClient: HttpClient) {

  }

  getSample(){
    return this.httpClient.get(`${this.serverBaseUri}applicationSettings`)
  }
  getError400(){
    return this.httpClient.get(`${this.serverBaseUri}error-400`)
  }
}
