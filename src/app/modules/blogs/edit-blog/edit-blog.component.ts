import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Blog } from 'src/app/models/blog';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  
  imageSrc!: string;
  edit_blog_form: FormGroup;
  blogid!:any;
  fileData:any;
  currentUser:any
    constructor(private authService:AuthService, public fb: FormBuilder,private blogService: BlogService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.edit_blog_form = this.fb.group({
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
  success: boolean=false;
  public events: string[] = [];
  public value = `Heyy user`;
  blog!:Blog;
  ImgUrl=environment.imgURL+'blogs/';
  
  ngOnInit() {
    this.authService.setTitle('Edit Blog');
    this._Activatedroute.paramMap.subscribe(params => { 

          this.blogid = params.get('id');
      this.blogService.editblog(params.get('id')).subscribe((res)=>{
        this.blog = res;
        console.log(this.blog.title);
        this.edit_blog_form.patchValue({
          title: this.blog.title,
          description: this.blog.description,
          image: this.blog.image
      });
  });
});

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
    // console.log(file);
    reader.readAsDataURL(file);
    
    reader.onload = () => {
 
      this.imageSrc = reader.result as string;
      // console.log(file.name);
    
    this.edit_blog_form.patchValue({
      image: file,
      fileData: file,
    });
    this.edit_blog_form.get('image')!.updateValueAndValidity();
  }

}
get f(){ return this.edit_blog_form.controls;}
    updateForm =() => {
      this.submitted = true;
      if(this.edit_blog_form.status == 'INVALID'){
        
        return;
      }
      console.log(this.edit_blog_form.get('image')!.value);
      var formData: any = new FormData();
      formData.append("title", this.edit_blog_form.value.title);
      formData.append("image", this.edit_blog_form.get('image')!.value);
      formData.append("description", this.edit_blog_form.value.description);
      formData.append("author", this.edit_blog_form.value.author);
      console.log(formData);
      this.blogService.updateblog(formData,this.blogid).pipe(first())
      .subscribe(
        data =>{
  
          console.log(data);
          this.success=true;
          this.router.navigate(['dashboard/blogs']);
          
        },
        error =>{
          this.error = error;
          console.log(error)
        }
      );
    }
}
