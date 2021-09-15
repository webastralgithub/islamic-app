import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

//Import Form
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';



//Import first
import {first} from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.minLength(3),Validators.email]),

    password: new FormControl('', [Validators.required, Validators.email]),

});
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
   
  ) { 

    //redirect to home if already logged in
    if(this.authService.currentUserValue){
      this.router.navigate(['dashboard/users']);
    }

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  //convinience getter for easy access to form fields
  get f(){ return this.loginForm.controls;}

  onSubmit(){

    this.submitted = true;

    // reset alerts on submit
    this.error = '';
    this.success = '';

    //stop here if the form is invalid
    if(this.loginForm.invalid){
      return;
    }


    this.authService.login(this.f.email.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data =>{
    this.loading = true;

        this.router.navigateByUrl('/');
        window.location.reload();
        this.success = 'Login successfully';
        
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )
  }


}
