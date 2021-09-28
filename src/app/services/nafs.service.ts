import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NafsService {

  currentUser:any;
  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  editNafs(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/nafs/view/"+id;
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }
  updateNafs(data:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'user/nafs/update/'+id;
    const response =  this.http.patch<any>(endPoint, data,httpOptions);
    return response;
  }
}
