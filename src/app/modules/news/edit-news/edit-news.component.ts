import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/News';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  
  editNews:FormGroup;
  news!:News;
  imageSrc:any;
  newsId:any;
  image:any;
  success:boolean=false;
    constructor(public fb: FormBuilder,private authService: AuthService,private newsService: NewsService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.editNews = this.fb.group({
        image: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    }
  user!:User;
  fileData:any;
  newsImage = environment.imgURL+'news/';
    ngOnInit(): void {
      this.authService.setTitle('Edit News');
      this._Activatedroute.paramMap.subscribe(params => { 
        this.newsService.editnews(params.get('id')).subscribe((res)=>{
          this.newsId = params.get('id');
          this.news = res;
          
          this.editNews.patchValue({
            title: this.news.title,
            image: this.news.image,
            description: this.news.description,
           
        });
        
    });
  });
    }
  
    get f(){ return this.editNews.controls;}
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
      
      this.editNews.patchValue({
        image: file,
        fileData: file,
      });
      this.editNews.get('image')!.updateValueAndValidity();
    }
  
  }
    updateNews(){
      var formData: any = new FormData();
      formData.append("title", this.editNews.value.title);
      formData.append("image", this.editNews.get('image')!.value);
      formData.append("description", this.editNews.value.description);

    this.newsService.updatenews(formData,this.newsId).subscribe((res)=>{
      this.success =true;
      console.log(res);
      
      // this.router.navigate(['dashboard/users']);
      
    })
  }

}
