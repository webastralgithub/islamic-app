import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Information } from 'src/app/models/information';
import { AuthService } from 'src/app/services/auth.service';
import { InformationService } from 'src/app/services/information.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {

  editInfo:FormGroup;
  currentUser:any;
  infoId:any;
  success:boolean=false;
    constructor(public fb: FormBuilder,private authService: AuthService,private infoService:InformationService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.editInfo = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
  info!:Information;
  ngOnInit() {
    this.authService.setTitle('Edit Information');
    this.getCurrentUser();
    
   }
  getCurrentUser = () => {

    this._Activatedroute.paramMap.subscribe(params => { 
      this.infoService.editInfo(params.get('id')).subscribe((res)=>{
        this.infoId = params.get('id');
        this.info = res.data;
        
        this.editInfo.patchValue({
          title: this.info.title,
          description: this.info.description,
         
      });
      
  });
});

  }
  get f(){ return this.editInfo.controls;}
  updateInfo(){
    this.infoService.updateInfo(this.editInfo.value,this.infoId).subscribe((res)=>{
      this.success = true;
      setTimeout(()=>{
        this.success = false;
      },2000)
      // this.getCurrentUser();
    })
  }
}



