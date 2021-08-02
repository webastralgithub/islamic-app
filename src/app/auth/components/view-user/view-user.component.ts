import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import {first} from 'rxjs/operators';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  user:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.viewProfile('60ffe739f68b6b24db7c1c11').subscribe((res)=>{
      console.log(res);
      
    })
  }

  
  

}
