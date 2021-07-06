import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveJawaban } from '../schemaService/saveJawaban';


@Injectable({
  providedIn: 'root'
})
export class SaveJawabanService {

  // url_daftar ="https://www.api.loker.esbrasilonline.com/api/lokers/form-save-jawaban";

  url_daftar ="https://www.api.loker.bogorstudio.com/api/Lokers/form-save-jawaban";

  constructor(private Http: HttpClient) { }

  PostSaveJawaban(saveJawaban: saveJawaban){
    return this.Http.post(this.url_daftar,saveJawaban,{responseType: 'text' })
  }
}
