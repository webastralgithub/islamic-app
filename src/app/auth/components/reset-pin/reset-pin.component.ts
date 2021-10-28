import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

//Import Form
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

//Import first
import {first} from 'rxjs/operators';
@Component({
  selector: 'app-reset-pin',
  templateUrl: './reset-pin.component.html',
  styleUrls: ['./reset-pin.component.scss']
})
export class ResetPinComponent implements OnInit {

  
  resetform = new FormGroup({

    new_pin: new FormControl('', [Validators.required]),

    confirm_pin: new FormControl('', [Validators.required]),

});
  reset_loading = false;
  reset_submitted = false;
  reset_returnUrl!: string;
  reset_error!: string;
  reset_success!: string;
  user_id!:string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
   
  ) { 

    // redirect to home if already logged in
    // if(this.authService.currentUserValue){
    //   this.router.navigate(['user']);
    // }

  }

  ngOnInit() {
    localStorage.removeItem('currentUser');   
    this.resetform = this.formBuilder.group({
      new_pin: ['', Validators.required],
      confirm_pin: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params=>{
      if(params['token'] && params['id']){
        this.user_id = params['id'];
        console.log(params['token'],params['id']);
        this.authService.checkResetToken(params['id'],params['token']).pipe(first())
        .subscribe(
          data =>{
        //  this.reset_loading = true;
        console.log(data);
        
    
            if(data === false){
              this.router.navigate(['']);
            }
            
            
          },
          error =>{
            console.log(error);
            
            
          }
        )
        
      }
    })

  }


  //convinience getter for easy access to form fields
  get f(){ return this.resetform.controls;}

  onSubmit(){

    this.reset_submitted = true;
    console.log(this.resetform.controls);
    // return false;
   

    // reset alerts on submit
    this.reset_error = '';
    this.reset_success = '';

    //stop here if the form is invalid
    if(this.resetform.invalid){
     
     return;
    }


    this.authService.resetPin(this.f.new_pin.value, this.f.confirm_pin.value,this.user_id)
    .pipe(first())
    .subscribe(
      data =>{
     this.reset_loading = true;
     console.log(data);
     this.reset_success = 'Reset pin Successfully !!!'
      this.router.navigate(['']);
        
        
      },
      error =>{
        this.reset_error = error.error.msg;

        // console.log(error);
        
        
      }
    )
  }



}
