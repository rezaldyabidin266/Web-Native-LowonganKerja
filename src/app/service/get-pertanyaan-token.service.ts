import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPertanyaanTokenService {

  url_pertayaan_token = "https://www.api.loker.bogorstudio.com/api/Lokers/form-pertanyaan-login"

  constructor(
    private http : HttpClient
  ) { }
  
  getPertayaanToken(){
    const httpOptions = {
      headers: new HttpHeaders({
        "idHeaderJawaban": localStorage.getItem("idHeaderJawaban"),
        "token": localStorage.getItem("token")
      })
    };

    return this.http.get(this.url_pertayaan_token,httpOptions)
  }
}
