import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRouteSnapshot, ResolveEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { filter, first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isOpen:boolean=false;
  constructor(private readonly title: Title,private _location: Location,public router:Router,private authService:AuthService) {
    // console.log(this.router.url);
    
    if(this.router.url === '/dashboard'){
      this.router.navigate(['dashboard/users']);
    }

   }
  user!:User;
  profile_image = environment.imgURL+'users';
  titlePage:any;
  pagetitle:any;
  ngOnInit(): void {
    this.setupTitleListener()
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
  private setupTitleListener() {
    this.router.events
      .pipe(filter(e => e instanceof ResolveEnd))
      .subscribe((e: any) => {
        const { data } = getDeepestChildSnapshot(e.state.root)
        if (data?.title) {
          console.log("tttt ",data.title)
          this.title.setTitle(data.title)
          this.titlePage = data.title;
        }
      })
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

function getDeepestChildSnapshot(snapshot: ActivatedRouteSnapshot) {
  let deepestChild = snapshot.firstChild
  while (deepestChild?.firstChild) {
    deepestChild = deepestChild.firstChild
  }
  return deepestChild || snapshot
}