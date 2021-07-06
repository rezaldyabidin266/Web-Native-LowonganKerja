import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetDataHistoryPengalamanService {

  url_get = "https://www.api.loker.bogorstudio.com/api/Lokers/get-data-historypengalaman"
  constructor(private http : HttpClient) { }

  getDataHistory(kosong : any){

    const httpOptions = {
      headers: new HttpHeaders({
        "token": localStorage.getItem("token")
      })
    };
    return this.http.post(this.url_get,kosong,httpOptions)
  }
}
