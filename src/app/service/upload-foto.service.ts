import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { uploadFoto } from '../schemaService/uploadFoto';

@Injectable({
  providedIn: 'root'
})
export class UploadFotoService {


  urlFoto = "https://www.api.loker.bogorstudio.com/api/Lokers/upload-foto";
  urlCv = "https://www.api.loker.bogorstudio.com/api/Lokers/upload-cv";

  //Real API
  // urlFoto = "https://www.api.loker.esbrasilonline.com/api/lokers/upload-foto";
  // urlCv = "https://www.api.loker.esbrasilonline.com/api/lokers/upload-cv";


  constructor(private Http : HttpClient) { }

  postFoto(foto : any): Observable<any>{
    return this.Http.post(this.urlFoto,foto,{
      responseType: 'text' ,
      reportProgress: true,
      observe: 'events'
  
  }).pipe(
    catchError(this.errorMgmt)
  )
}

  postCv(foto : any): Observable<any>{
    return this.Http.post(this.urlCv,foto,{
      responseType: 'text' ,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

