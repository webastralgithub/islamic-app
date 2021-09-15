import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isOpen:boolean=false;
  constructor(private _location: Location,public router:Router,private authService:AuthService) {
    // console.log(this.router.url);
    
    if(this.router.url === '/dashboard'){
      this.router.navigate(['dashboard/users']);
    }

   }
  user!:User;
  profile_image = environment.imgURL+'users';
  pagetitle:any;
  ngOnInit(): void {
    this.authService.setTitle('Dashboard');
    this.authService.getTitle().subscribe(appTitle => this.pagetitle = appTitle);
    this.authService.getCurrentUser()
    .pipe(first())
    .subscribe(
      data =>{
        this.user = data;
      },
      error =>{
       console.log(error);
             
      }
    )
  }
  backClicked() {
      
  this._location.back();
}
dropdownHandler =() => {
  this.isOpen =!this.isOpen;
}

logout() {
  console.log('cliked logout');
  
  this.authService.logout();
  this.router.navigate(["/"]);
}
}
