import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'users', loadChildren: () => import('./../modules/home/home.module').then(m => m.HomeModule ) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),MatTableModule],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
