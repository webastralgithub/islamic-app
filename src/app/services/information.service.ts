import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  
  currentUser:any;
  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.infoList();
    
      }


  infoList = () =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/info/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }



  storeInfo(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'user/info/create';
    const response =  this.http.post<any>(endPoint, data,httpOptions);
    return response;
  }

  deleteInfo(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/info/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }

  editInfo(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/info/view/"+id;
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }
  updateInfo(data:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'user/info/update/'+id;
    const response =  this.http.patch<any>(endPoint, data,httpOptions);
    return response;
  }
}
