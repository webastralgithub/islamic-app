import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import {first} from 'rxjs/operators';

import { User } from 'src/app/models/user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error:any;
  users!: User[];
  success!:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
   
  ) {

    this.getUser();

    this.authService.getCurrentUser()
    .pipe(first())
    .subscribe(
      data =>{
        console.log(data);
        
      },
      error =>{
       console.log(error);
             
      }
    )
  }

  ngOnInit() {}

  getUser = () =>{
    this.authService.getUsers()
    .pipe(first())
    .subscribe(
      users =>{
        this.users = users.data;
      },
      error =>{
        this.error = error.error.msg;        
      }
    )
  }

  deleteUser = (id:string) => {
    var status = confirm("Do you want to delete this user ?");
    if(!status){
      return;
    }
    this.authService.deleteUser(id)
    .pipe(first())
    .subscribe(
      data =>{
        this.success = 'User Deleted Successfully';
        this.getUser();        
      },
      error =>{
        this.error = error.error.msg;        
      }
    )      
  }

  changeStatus = (status:boolean,id:string) =>{
    this.authService.changeUserStatus(status,id)
    .pipe(first())
    .subscribe(
      data =>{
        this.success = 'User status changed Successfully';
      },
      error =>{
        this.error = error.error.msg;        
      }
    )
  }
}




