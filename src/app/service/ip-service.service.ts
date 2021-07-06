import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http: HttpClient) { }
  getIpAddress() {
    return this.http
          .get('https://jsonip.com')
          .map(response => response || {})
      
}
  private handleError(error: HttpErrorResponse):
      Observable<any> {
        //Log error in the browser console
        console.error('observable error: ', error);

        return Observable.throw(error);
    }
}
