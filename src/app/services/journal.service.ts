import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpHeaders,HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient) {}
 currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  journalListing = () =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/journal/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    console.log(response);
    
    return response;
  }
  deleteJournal(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/journal/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }
}
