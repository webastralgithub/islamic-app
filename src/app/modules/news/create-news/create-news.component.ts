import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss']
})
export class CreateNewsComponent implements OnInit {

  
  createNews:FormGroup;
  currentUser:any;
  imageSrc:any;
  image:any;
  success:boolean=false;
    constructor(public fb: FormBuilder,private newsService: NewsService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.createNews = this.fb.group({
        image: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
  user!:User;
  fileData:any;
  profile_image = environment.imgURL+'users';
    ngOnInit(): void {
     
    }
  
    get f(){ return this.createNews.controls;}
    onKey(event:any,val:any){
    console.log(val);

    }
    uploadFile(event:any) {
      const reader = new FileReader();
      const file = event.target.files[0];
      // console.log(event.target.files);
      reader.readAsDataURL(file);
      
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
        // console.log(file.name);
      
      this.createNews.patchValue({
        image: file,
        fileData: file,
      });
      this.createNews.get('image')!.updateValueAndValidity();
    }
  
  }
    saveNews(){
      var formData: any = new FormData();
      formData.append("title", this.createNews.value.title);
      formData.append("image", this.createNews.get('image')!.value);
      formData.append("description", this.createNews.value.description);

    this.newsService.storenews(formData).subscribe((res)=>{
      this.success =true;
      console.log(res);
      
      // this.router.navigate(['dashboard/users']);
      
    })
  }
}
