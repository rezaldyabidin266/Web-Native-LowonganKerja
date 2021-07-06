import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addPengalamanToken } from '../schemaService/addPengalamanToken';

@Injectable({
  providedIn: 'root'
})
export class AddPengalamanTokenService {

  url_pengalamanToken = "https://www.api.loker.bogorstudio.com/api/Lokers/add-pengalaman-login";

  constructor(private Http : HttpClient) { }

  postPengalamanToken(pengalamanToken : addPengalamanToken){
    const httpOptions:Object = {
      headers: new HttpHeaders({
        "token": localStorage.getItem("token"),
      }),
      responseType: 'text'
    };
    return this.Http.post(
      this.url_pengalamanToken,pengalamanToken,httpOptions);
  }

}
