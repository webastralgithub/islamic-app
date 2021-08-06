import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpHeaders,HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
currentUser:any;
  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.bookList();
    
      }


  bookList = () =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/book/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }



  storeBook(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/book/create';
    const response =  this.http.post<any>(endPoint, data);
    return response;
  }

  deleteBook(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/book/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }

}
