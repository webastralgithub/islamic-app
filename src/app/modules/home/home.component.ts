import { Component, OnDestroy, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import {first} from 'rxjs/operators';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { User } from 'src/app/models/user'
import { Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  users: User[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  error:any;
  success!:string;
  dtElement: any;
  loading:boolean=true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
   
  ) {}

  ngOnInit(): void {
     
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 5,
      // serverSide: true,
      // processing: true,
    };
    this.getUser();
  }

  getUser = () =>{
    this.authService.getUsers()
    .subscribe(
      users =>{
          this.ngxService.start(); 
          setTimeout(() => {
            this.ngxService.stop(); 
          }, 1000);
        this.users = users.data;
        this.dtTrigger.next();
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
    .subscribe(
      data =>{
        this.success = 'User status changed Successfully';
      },
      error =>{
        this.error = error.error.msg;        
      }
    )
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}




