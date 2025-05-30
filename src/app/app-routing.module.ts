import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetPinComponent } from './auth/components/reset-pin/reset-pin.component';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  { path: '', component: LoginComponent },
  {path: 'reset', component: ResetPasswordComponent},
  {path: 'reset-pin', component: ResetPinComponent},

  // {
  //   path: '**', loadChildren: ()
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
