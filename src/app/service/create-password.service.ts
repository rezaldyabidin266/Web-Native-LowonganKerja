import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPassword } from '../schemaService/createPassword';

@Injectable({
  providedIn: 'root'
})
export class CreatePasswordService {

  url_Create_Password ="https://www.api.loker.bogorstudio.com/api/Users/buat-password-baru";
  constructor(private Http: HttpClient) { }
  postGantiPassword( createPassword:createPassword ){
    return this.Http.post(this. url_Create_Password,createPassword,{responseType : 'text'})
  }
}
