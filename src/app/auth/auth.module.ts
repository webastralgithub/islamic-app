import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPinComponent } from './components/reset-pin/reset-pin.component';
// import { ViewUserComponent } from './components/view-user/view-user.component';


@NgModule({
  declarations: [],
  // declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ResetPinComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
