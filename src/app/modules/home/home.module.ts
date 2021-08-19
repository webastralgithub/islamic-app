import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';


const homeRoutes: Routes = [
  { path: '', component: HomeComponent }
]
// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   bgsColor: "red",
//   bgsPosition: POSITION.bottomCenter,
//   bgsSize: 40,
//   bgsType: SPINNER.ballSpinClockwise, // background spinner type
//   fgsType: SPINNER.threeStrings, // foreground spinner type
//   pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
//   pbThickness: 5, // progress bar thickness
// };
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
    NgxUiLoaderModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
