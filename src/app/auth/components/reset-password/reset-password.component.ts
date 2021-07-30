import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

//Import Form
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

//Import first
import {first} from 'rxjs/operators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetform = new FormGroup({

    new_password: new FormControl('', [Validators.required]),

    confirm_password: new FormControl('', [Validators.required]),

});
  reset_loading = false;
  reset_submitted = false;
  reset_returnUrl!: string;
  reset_error!: string;
  reset_success!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
   
  ) { 

    //redirect to home if already logged in
    // if(this.authService.currentUserValue){
    //   this.router.navigate(['dashboard']);
    // }

  }

  ngOnInit() {

    this.resetform = this.formBuilder.group({
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });

  }


  //convinience getter for easy access to form fields
  get f(){ return this.resetform.controls;}

  onSubmit(){
    // alert('heyyy');
    this.reset_submitted = true;
    console.log(this.resetform.controls);
    // return false;
   

    // reset alerts on submit
    this.reset_error = '';
    this.reset_success = '';

    //stop here if the form is invalid
    if(this.resetform.invalid){
     alert('error')
    }


    this.authService.resetPassword(this.f.new_password.value, this.f.confirm_password.value)
    .pipe(first())
    .subscribe(
      data =>{
     this.reset_loading = true;

        // this.router.navigateByUrl('/');
        // window.location.reload();
        // this.reset_success = 'Login successfully';
        console.log(data);
        
        
      },
      error =>{
        this.reset_error = error.error.msg;
        
      }
    )
  }


}
