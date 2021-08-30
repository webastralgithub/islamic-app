import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  currentUser:any;
  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.blogList();
    
      }


  blogList = () =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/blog/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }



  storeblog(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/blog/create';
    const response =  this.http.post<any>(endPoint, data);
    return response;
  }

  deleteblog(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/blog/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }

  editblog(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/blog/view/"+id;
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }
  updateblog(data:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/blog/update/'+id;
    const response =  this.http.patch<any>(endPoint, data);
    return response;
  }
}
