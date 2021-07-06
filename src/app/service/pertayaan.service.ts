import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PertayaanService {

  idHeader = localStorage.getItem("idHeaderJawaban");
  // url_pertanyaan = "https://www.api.loker.esbrasilonline.com/api/lokers/form-pertanyaan?idHeaderJawaban=" ;

  url_pertanyaan = "https://www.api.loker.bogorstudio.com/api/Lokers/form-pertanyaan?idHeaderJawaban=" ;
  constructor( private http : HttpClient) { }

  getPertayaan(){
    return this.http.get(this.url_pertanyaan + this.idHeader);
  }
}
