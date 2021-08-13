import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  currentUser:any;
  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  storeChapter(title:string,description:any,book_id:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/chapter/create';
    console.log(title,description,book_id);
    const response =  this.http.post<any>(endPoint, {title,description,book_id},httpOptions);
    return response;
  }

  bookChapters = (id:any) =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/chapter/"+id+"/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }

  editChapter(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/chapter/view/"+id;
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }
  updateChapter(data:any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'admin/chapter/update/'+id;
    const response =  this.http.patch<any>(endPoint, data,httpOptions);
    return response;
  }

  deleteChapter(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/chapter/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }
}
