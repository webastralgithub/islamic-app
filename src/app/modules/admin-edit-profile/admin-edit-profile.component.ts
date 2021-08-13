import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-admin-edit-profile',
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.scss']
})

export class AdminEditProfileComponent implements OnInit {
editAdmin:FormGroup;
uploadImage:FormGroup;
currentUser:any;
imageSrc:any;
image:any;
success:boolean=false;
  constructor(public fb: FormBuilder,private authService: AuthService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
    this.editAdmin = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.uploadImage = this.fb.group({
      image: ['', Validators.required],
    });
this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
user!:User;
fileData:any;
profile_image = environment.imgURL+'users';
  ngOnInit(): void {
    this.authService.getCurrentUser()
    .pipe(first())
    .subscribe(
      data =>{
        this.user = data;
        this.editAdmin.patchValue({
          name: this.user.name,
          gender: this.user.gender,
         
      });
      },
      error =>{
       console.log(error);
             
      }
    )
  }
  get f(){ return this.editAdmin.controls;}
  updateUser(){
   console.log(this.editAdmin.value);
   this.authService.updateAdmin(this.editAdmin.value).subscribe((res)=>{
    console.log(res);
    this.success = true;
    setTimeout(()=>{
      this.success = false;
    },2000)
    
   })

  }
  uploadFile(event:any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      // console.log(file.name);
    
    this.uploadImage.patchValue({
      image: file,
      fileData: file,
    });
    this.uploadImage.get('image')!.updateValueAndValidity();
    // console.log(this.uploadImage.get('image')!.value);
    
    var formData: any = new FormData();
    formData.append("image", this.uploadImage.get('image')!.value);
    
   
    this.authService.uploadImage(formData).pipe(first())
    .subscribe(
      data =>{

        console.log(data);
        this.success =true;
        // this.router.navigate(['dashboard/books']);
        
      },
      error =>{
        // this.error = error;
        console.log(error)
      }
    );
  }

}
 
}
