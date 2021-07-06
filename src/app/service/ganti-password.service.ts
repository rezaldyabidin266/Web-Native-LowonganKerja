import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gantiPassword } from '../schemaService/gantiPassword';

@Injectable({
  providedIn: 'root'
})
export class GantiPasswordService {

  url_gantiPassword = "https://www.api.loker.bogorstudio.com/api/Users/ganti-password";

  constructor( private Http : HttpClient) { }

  postGantiPassword(gantiPassword : gantiPassword){
    return this.Http.post(this.url_gantiPassword,gantiPassword,{responseType : 'text'})
  }
}
