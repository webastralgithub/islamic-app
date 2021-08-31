import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  imageSrc!: string;
  saveBlog: FormGroup;

  fileData:any;
  currentUser:any
    constructor(private authService:AuthService,public fb: FormBuilder,private blogService: BlogService, private http: HttpClient,private router:Router) {
      this.saveBlog = this.fb.group({
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
    this.authService.setTitle('Create Blog');
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
    
    this.saveBlog.patchValue({
      image: file,
      fileData: file,
    });
    this.saveBlog.get('image')!.updateValueAndValidity();
  }

}
get f(){ return this.saveBlog.controls;}
    submitForm =() => {
      
      console.log(this.saveBlog.status);
      this.submitted = true;
      if(this.saveBlog.status == 'INVALID'){
        console.log(this.saveBlog.value);
        
        return;
      }
      // return 'heyy';
      
      var formData: any = new FormData();
      formData.append("title", this.saveBlog.value.title);
      formData.append("image", this.saveBlog.get('image')!.value);
      formData.append("description", this.saveBlog.value.description);
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
