import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from '../schemaService/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url_login = "https://www.api.loker.bogorstudio.com/api/Users/login";

  constructor( private Http : HttpClient) { }

  postLogin(login : login){
    return this.Http.post(this.url_login,login)
  }

}
