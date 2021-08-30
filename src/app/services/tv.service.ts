import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  currentUser:any;
  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.tvList();
  }


  tvList = () =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/tv/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }



  storetv(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/tv/create';
    const response =  this.http.post<any>(endPoint, data);
    return response;
  }

  deletetv(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/tv/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }

  edittv(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/tv/view/"+id;
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }
  updatetv(data:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/tv/update/'+id;
    const response =  this.http.patch<any>(endPoint, data);
    return response;
  }
}
