import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { HttpHeaders,HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
  
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private title = new BehaviorSubject<String>('');
  private title$ = this.title.asObservable();

  setTitle(title: String) {
    this.title.next(title);
  }

  getTitle(): Observable<String> {
    return this.title$;
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: any;
  public adminId!:string;


  constructor(private http: HttpClient) { 
const token:any = localStorage.getItem('currentUser'); 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(token));
    this.currentUser = this.currentUserSubject.asObservable();
this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
// this.getCurrentUser();
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


  getCurrentUser(){
      
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/xml',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'user/me';
    return this.http.post<any>(endPoint,null,httpOptions)
      .pipe(map(user=>{

        this.adminId = user._id;
        return user;
        
      }));
  }

  resetPassword(new_password:string, confirm_password:string,user_id:string){
    const endPoint = environment.apiURL + 'user/reset/'+user_id;
    return this.http.patch<any>(endPoint, {new_password, confirm_password})
      .pipe(map(user=>{
        return user;
      }));
  }

  logout(){

    localStorage.removeItem('currentUser');    
    this.currentUserSubject.next(null);
  }

  getUsers(): Observable<any> {
    
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


  resetPin(new_token:string, confirm_token:string,user_id:string){
    const endPoint = environment.apiURL + 'user/resetPin/'+user_id;
    return this.http.patch<any>(endPoint, {new_token, confirm_token})
      .pipe(map(user=>{
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


  updateAdmin(data:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/update/"+this.adminId;
    const response = this.http.patch<any>(endPoint,data,httpOptions);
    return response;
  }

  updateUser(data:any,id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/update/"+id;
    const response = this.http.patch<any>(endPoint,data,httpOptions);
    return response;
  }

  uploadImage(data:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + "user/updateUserImage/"+this.adminId;
    const response = this.http.patch<any>(endPoint,data,httpOptions);
    return response;
  }

  createUser(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'auth-token':this.currentUser.auth_token
      })
    };
    const endPoint = environment.apiURL + 'user/register';
    const response =  this.http.post<any>(endPoint, data);
    return response;
  }
}
