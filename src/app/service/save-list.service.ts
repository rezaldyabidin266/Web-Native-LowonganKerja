import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveListService {

  url_daftar ="https://www.api.loker.bogorstudio.com/api/Lokers/form-list-save-jawaban";

  constructor(private Http: HttpClient) { }

  PostSaveListJawaban(saveListJawaban: Array<any> = []){
    return this.Http.post(this.url_daftar,saveListJawaban,{responseType: 'text' })
  }
}
