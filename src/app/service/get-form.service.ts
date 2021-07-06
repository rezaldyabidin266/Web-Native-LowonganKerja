import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetFormService {

  idHeader = localStorage.getItem("idHeaderJawaban");
  url_get = "https://www.api.loker.bogorstudio.com/api/Lokers/get-hasil-form?jawabanHeaderId=" ;

  // url_get = "https://www.api.loker.esbrasilonline.com/api/Lokers/get-hasil-form?jawabanHeaderId="
  constructor(private http : HttpClient) { }

  getPertayaan(){
    return this.http.get(this.url_get + this.idHeader);
  }
}
