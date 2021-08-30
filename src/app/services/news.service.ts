import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentUser:any;
  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.newsList();
    
      }


  newsList = () =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/news/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }



  storenews(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/news/create';
    const response =  this.http.post<any>(endPoint, data);
    return response;
  }

  deletenews(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/news/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }

  editnews(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/news/view/"+id;
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }
  updatenews(data:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/news/update/'+id;
    const response =  this.http.patch<any>(endPoint, data);
    return response;
  }
}
