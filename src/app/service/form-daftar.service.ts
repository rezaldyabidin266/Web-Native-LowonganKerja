import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formDaftar } from '../schemaService/formDaftar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormDaftarService {

  // url_daftar ="https://www.api.loker.esbrasilonline.com/api/lokers/daftar";

  url_daftar ="https://www.api.loker.bogorstudio.com/api/Lokers/daftar";
  constructor(private Http: HttpClient) { }

  PostFormDaftar(formDaftar: formDaftar): Observable<any>{
    return this.Http.post(this.url_daftar,formDaftar,{
      reportProgress: true,
      observe: 'events'
    })
  }
}
