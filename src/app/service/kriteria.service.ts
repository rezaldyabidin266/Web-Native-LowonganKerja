import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class KriteriaService {
  
  // url_kriteria = "https://www.api.loker.esbrasilonline.com/api/lokers/kriteria?idLowongan=" ;

  url_kriteria = "https://www.api.loker.bogorstudio.com/api/Lokers/kriteria?idLowongan=" ;


  constructor(private http : HttpClient) { }

  getKriteria(idLowongan : number){
  // const headers = new HttpHeaders();
  // headers.append('idLowongan',idLowongan.toLocaleString());
    return this.http.get(this.url_kriteria + idLowongan);
  }
}
