import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams, } from '@angular/common/http';
import { Injectable,} from '@angular/core';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataPelamarService {

  token = localStorage.getItem("token");
  tokenReplace = localStorage.getItem("tokenReplace")

  // url TOKEN Hearders
  url_get = "https://www.api.loker.bogorstudio.com/api/Lokers/get-data-pelamar" ;

  //URL TOKENREPLACE
  // url_get = "https://www.api.loker.bogorstudio.com/api/Lokers/get-data-pelamar?token=" ;

  

  constructor(private http : HttpClient) { }

  getDataPelamar(token : any,kosong : any){

    const httpOptions = {
      headers: new HttpHeaders({
        "token": localStorage.getItem("token")
      })
    };
    return this.http.post(this.url_get,kosong,httpOptions)
  }

}

