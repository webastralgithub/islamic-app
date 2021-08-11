import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/user'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

ImgUrl=environment.imgURL+'users/';

  constructor(private route:Router,private _Activatedroute:ActivatedRoute,private authService:AuthService) { }

  user!: User;  
  ngOnInit() {

    this._Activatedroute.paramMap.subscribe(params => { 

          
      this.authService.viewProfile(params.get('id')).subscribe((res)=>{
        this.user = res;
      
  });
});
   }
 
}
