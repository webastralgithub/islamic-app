import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditorModule } from '@progress/kendo-angular-editor';
import { AuthGuard } from '../guard';


@NgModule({
  declarations: [LayoutComponent, SidebarComponent, UserProfileComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    EditorModule
  ],
  providers:[[AuthGuard]]
})
export class LayoutModule { }
