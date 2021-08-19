import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUser:FormGroup;
  currentUser:any;
  imageSrc:any;
  image:any;
  success:boolean=false;
    constructor(public fb: FormBuilder,private authService: AuthService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.editUser = this.fb.group({
        name: ['', Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        mobile_number:['', Validators.required],
      });
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
  user!:User;
  fileData:any;
  userId:any;
  profile_image = environment.imgURL+'users';
  ngOnInit() {

    this.getCurrentUser();
    
   }
  getCurrentUser = () => {

    this._Activatedroute.paramMap.subscribe(params => { 
      this.authService.viewProfile(params.get('id')).subscribe((res)=>{
        this.userId = params.get('id');
        this.user = res;
        this.editUser.patchValue({
          name: this.user.name,
          gender: this.user.gender,
          mobile_number: this.user.mobile_number,
          address: this.user.address,
         
      });
      
  });
});
  }
    get f(){ return this.editUser.controls;}
    onKey(event:any,val:any){
    console.log(val);

    }
  updateUser(){
    this.editUser.value.user_role = 'user';
    this.authService.updateUser(this.editUser.value,this.userId).subscribe((res)=>{
      console.log(res);
      this.success = true;
      setTimeout(()=>{
        this.success = false;
      },2000)
      this.getCurrentUser();
    })
  }
}
