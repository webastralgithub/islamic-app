import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}
 currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  todoListing = () =>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/todo/list";
    const response = this.http.get<any>(endPoint,httpOptions);
    console.log(response);
    
    return response;
  }
  deleteTodo(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/todo/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }
}
