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
  users:User[];
  success:string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
   
  ) {

    this.getUser();
  }

  ngOnInit() {
   
    
  }

  getUser = () =>{
    this.authService.getUsers()
    .pipe(first())
    .subscribe(
      users =>{

        console.log(users.data);
        this.users = users.data;
        
        
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )

  }
  deleteUser = (id:string) => {
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
}




