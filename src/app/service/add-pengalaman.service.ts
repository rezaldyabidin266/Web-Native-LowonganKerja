import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { addPengalaman } from '../schemaService/addPengalaman';

@Injectable({
  providedIn: 'root'
})
export class AddPengalamanService {

  // url_pengalaman = "https://www.api.loker.esbrasilonline.com/api/lokers/add-pengalaman";

  
  url_pengalaman = "https://www.api.loker.bogorstudio.com/api/Lokers/add-pengalaman";

  constructor(private Http : HttpClient) { }

  postPengalaman(pengalaman : addPengalaman){
    return this.Http.post(this.url_pengalaman,pengalaman);
  }

}
