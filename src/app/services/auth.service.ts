import { Injectable } from '@angular/core';

//Import HttpClient
// import {HttpClient} from '@angular/common/http';

//Import Observables and Behaviour Subject
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpHeaders,HttpClient } from "@angular/common/http";
//Import Map
import {map} from 'rxjs/operators';

//Import API URL
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: any;


  constructor(private http: HttpClient) { 
const token:any = localStorage.getItem('currentUser'); 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(token));
    this.currentUser = this.currentUserSubject.asObservable();
console.log(this.currentUser);
this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  }

  public get currentUserValue(){

    return this.currentUserSubject.value;

  }

  login(email:any, password:any){
    const endPoint = environment.apiURL + 'admin/login';
    return this.http.post<any>(endPoint, {email, password})
      .pipe(map(user=>{

        //Store user details and jwt int local storage to keep user logged in
        localStorage.setItem('currentUser',JSON.stringify(user));
        return user;
      }));
  }

  resetPassword(new_password:string, confirm_password:string){
    const endPoint = environment.apiURL + 'user/reset/60f80396a4f7811c8dad57c7';
    return this.http.patch<any>(endPoint, {new_password, confirm_password})
      .pipe(map(user=>{
        console.log(user);
        return user;
      }));
  }

  logout(){

    localStorage.removeItem('currentUser');    
    this.currentUserSubject.next(null);
  }

  getUsers(): Observable<any> {
    // console.log(this.currentUser.auth_token);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/users/";
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }

  deleteUser(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/user/delete/"+id;
    const response = this.http.delete<any>(endPoint,httpOptions);
    return response;
  }


  changeUserStatus(status:boolean,id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/user/changeStatus/"+id;
    const response = this.http.patch<any>(endPoint,{status},httpOptions);
    return response;
  }

  checkResetToken(id:string,token:string): Observable<any> {
    const endPoint = environment.apiURL + "user/checkToken/"+token;
    const response = this.http.get<any>(endPoint);
    return response;
  }


  resetPin(new_token:string, confirm_token:string){
    const endPoint = environment.apiURL + 'user/resetPin/60f80396a4f7811c8dad57c7';
    return this.http.patch<any>(endPoint, {new_token, confirm_token})
      .pipe(map(user=>{
        console.log(user);
        return user;
      }));
  }

  viewProfile(id:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "admin/viewuser/"+id;
    const response = this.http.get<any>(endPoint,httpOptions);
    return response;
  }
}
