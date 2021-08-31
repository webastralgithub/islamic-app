import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';
import { TvService } from 'src/app/services/tv.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-tv',
  templateUrl: './edit-tv.component.html',
  styleUrls: ['./edit-tv.component.scss']
})
export class EditTvComponent implements OnInit {

  
  editTv:FormGroup;
  tvList!:any;
  imageSrc:any;
  TvId:any;
  image:any;
  success:boolean=false;
    constructor(public fb: FormBuilder,private authService: AuthService,private tvService: TvService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.editTv = this.fb.group({
        image: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    }
  user!:User;
  fileData:any;
  newsImage = environment.imgURL+'news/';
    ngOnInit(): void {
      this.authService.setTitle('Edit TV');
      this._Activatedroute.paramMap.subscribe(params => { 
        this.tvService.edittv(params.get('id')).subscribe((res)=>{
          this.TvId = params.get('id');
          this.tvList = res;
          
          this.editTv.patchValue({
            title: this.tvList.title,
            image: this.tvList.image,
            description: this.tvList.description,
           
        });
        
    });
  });
    }
  
    get f(){ return this.editTv.controls;}
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
      
      this.editTv.patchValue({
        image: file,
        fileData: file,
      });
      this.editTv.get('image')!.updateValueAndValidity();
    }
  
  }
    updateTV(){
      var formData: any = new FormData();
      formData.append("title", this.editTv.value.title);
      formData.append("image", this.editTv.get('image')!.value);
      formData.append("description", this.editTv.value.description);

    this.tvService.updatetv(formData,this.TvId).subscribe((res)=>{
      this.success =true;
      console.log(res);
      
      // this.router.navigate(['dashboard/users']);
      
    })
  }

}
