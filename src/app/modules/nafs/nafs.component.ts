import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Nafs } from 'src/app/models/nafs';
import { AuthService } from 'src/app/services/auth.service';
import { NafsService } from 'src/app/services/nafs.service';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-nafs',
  templateUrl: './nafs.component.html',
  styleUrls: ['./nafs.component.scss']
})
export class NafsComponent implements OnInit {

  edit_nafs_form: FormGroup;
  nafsid!:any;
  currentUser:any
    constructor( private ngxService: NgxUiLoaderService,private authService:AuthService, public fb: FormBuilder,private nafsService: NafsService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
     
      this.edit_nafs_form = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
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
  nafs!:Nafs;
  
  ngOnInit() {
    this.authService.setTitle('Edit nafs');
    this._Activatedroute.paramMap.subscribe(params => { 

          this.nafsid = params.get('id');
      this.nafsService.editNafs(params.get('id')).subscribe((res)=>{
        this.ngxService.start(); 
        setTimeout(() => {
          this.ngxService.stop(); 
        }, 1000);
        this.nafs = res.data;
        
        this.edit_nafs_form.patchValue({
          name: this.nafs.name,
          description: this.nafs.description,
      });
  });
});

   }
  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  private log(event: string, arg: any): void {
    this.events.push(`${event} ${arg || ""}`);
    
  }

get f(){ return this.edit_nafs_form.controls;}
    updateForm =() => {
      this.submitted = true;
      if(this.edit_nafs_form.status == 'INVALID'){
        
        return;
      }

      this.nafsService.updateNafs(this.edit_nafs_form.value,this.nafsid).pipe(first())
      .subscribe(
        data =>{
          this.success=true;
          // this.router.navigate(['dashboard/nafss']);
          
        },
        error =>{
          this.error = error;
          console.log(error)
        }
      );
    }
}
