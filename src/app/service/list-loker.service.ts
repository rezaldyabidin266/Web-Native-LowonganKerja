import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { listLoker } from '../schemaService/list-loker';

@Injectable({
  providedIn: 'root'
})
export class ListLokerService {

  // url_loker_list = "https://www.api.loker.esbrasilonline.com/api/lokers/list-loker";
 
  url_loker_list = "https://www.api.loker.bogorstudio.com/api/Lokers/list-loker";

  constructor(private HttpClient : HttpClient) {

   }

   getListLoker(){
    // const headers = new HttpHeaders({
    //   'Content-Type':'application/json; charset=utf-8',
    //   'Access-Control-Allow-Origin':'*',
    // });
      return this.HttpClient.get(this.url_loker_list)
   }

   
}
