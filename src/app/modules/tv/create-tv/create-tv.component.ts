import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create-tv',
  templateUrl: './create-tv.component.html',
  styleUrls: ['./create-tv.component.scss']
})
export class CreateTvComponent implements OnInit {

  imageSrc!: string;
  saveTv: FormGroup;

  fileData:any;
  currentUser:any
    constructor(public fb: FormBuilder,private blogService: BlogService,private authService: AuthService, private http: HttpClient,private router:Router) {
      this.saveTv = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        image: ['', Validators.required]
      });
   
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success: boolean =false;
  public events: string[] = [];
  public value = ``;
  
  ngOnInit() { 
    this.authService.setTitle('Create Tv');
  }
  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  private log(event: string, arg: any): void {
    this.events.push(`${event} ${arg || ""}`);
    console.log(this.events);
    
  }
  uploadFile(event:any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    // console.log(event.target.files);
    reader.readAsDataURL(file);
    
    reader.onload = () => {
 
      this.imageSrc = reader.result as string;
      // console.log(file.name);
    
    this.saveTv.patchValue({
      image: file,
      fileData: file,
    });
    this.saveTv.get('image')!.updateValueAndValidity();
  }

}
get f(){ return this.saveTv.controls;}
    submitForm =() => {
      
      console.log(this.saveTv.status);
      this.submitted = true;
      if(this.saveTv.status == 'INVALID'){
        console.log(this.saveTv.value);
        
        return;
      }
      // return 'heyy';
      
      var formData: any = new FormData();
      formData.append("title", this.saveTv.value.title);
      formData.append("image", this.saveTv.get('image')!.value);
      formData.append("description", this.saveTv.value.description);
      this.blogService.storeblog(formData).pipe(first())
      .subscribe(
        data =>{
          this.success =true;
          this.router.navigate(['dashboard/blogs']);          
        },
        error =>{
          this.error = error;
          console.log(error)
        }
      );
    }

}
