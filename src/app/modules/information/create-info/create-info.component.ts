import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-create-info',
  templateUrl: './create-info.component.html',
  styleUrls: ['./create-info.component.scss']
})
export class CreateInfoComponent implements OnInit {

  
  imageSrc!: string;
  saveInfo: FormGroup;

  fileData:any;
  currentUser:any
    constructor(private authService:AuthService,public fb: FormBuilder,private infoService: InformationService, private http: HttpClient,private router:Router) {
      this.saveInfo = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
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
    this.authService.setTitle('Create Information');
   }
  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  private log(event: string, arg: any): void {
    this.events.push(`${event} ${arg || ""}`);
    
  }

get f(){ return this.saveInfo.controls;}
    submitForm =() => {
      this.submitted = true;
      console.log(this.saveInfo.status);
      
      if(this.saveInfo.status == 'INVALID'){
        
        return;
      }
   
      this.infoService.storeInfo(this.saveInfo.value).subscribe((res)=>{
        this.success =true;
        this.router.navigate(['dashboard/informations']);
        
      })
    }


}
