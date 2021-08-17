import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
