import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { register } from '../schemaService/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url_daftar ="https://www.api.loker.bogorstudio.com/api/Users/register";
  constructor(private Http: HttpClient) { }

  PostRegister(formDaftar: register): Observable<any>{
    return this.Http.post(this.url_daftar,formDaftar,{
      reportProgress: true,
      observe: 'events',
      responseType : 'text'
    })
  }
}
