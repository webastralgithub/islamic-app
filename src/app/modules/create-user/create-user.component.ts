import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  createUser:FormGroup;
  currentUser:any;
  imageSrc:any;
  image:any;
  success:boolean=false;
    constructor(public fb: FormBuilder,private authService: AuthService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.createUser = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        gender: ['', Validators.required],
        password: ['', Validators.required],
        address: ['', Validators.required],
        mobile_number:['', Validators.required],
        user_role:['', Validators.required],
      });
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
  user!:User;
  fileData:any;
  profile_image = environment.imgURL+'users';
    ngOnInit(): void {
      this.authService.setTitle('Create User');
    }
  
    get f(){ return this.createUser.controls;}

    onKey(event:any,val:any){
    console.log(val);

    }
  saveUser(){
    this.createUser.value.user_role = 'user';
    // console.log(this.createUser.value);
    // return;
    this.authService.createUser(this.createUser.value).subscribe((res)=>{
      this.success =true;
      // this.router.navigate(['dashboard/users']);
      
    })
  }
}
