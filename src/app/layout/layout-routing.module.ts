import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatTableModule } from '@angular/material/table';
import { JournalsComponent } from '../modules/journals/journals.component';
import { BookListComponent } from '../modules/book-list/book-list.component';
import { EditBookComponent } from '../modules/book-list/edit-book/edit-book.component';
import { BookCreateComponent } from '../modules/book-list/book-create/book-create.component';
import { AuthGuard } from '../guard';
import { AdminEditProfileComponent } from '../modules/admin-edit-profile/admin-edit-profile.component';
import { CreateChapterComponent } from '../modules/book-list/chapters-list/create-chapter/create-chapter.component';
import { EditChapterComponent } from '../modules/book-list/chapters-list/edit-chapter/edit-chapter.component';
import { ChaptersListComponent } from '../modules/book-list/chapters-list/chapters-list.component';
import { CreateUserComponent } from '../modules/create-user/create-user.component';
import { EditUserComponent } from '../modules/edit-user/edit-user.component';



const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'users', loadChildren: () => import('./../modules/home/home.module').then(m => m.HomeModule ),canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'userProfile/:id', component: UserProfileComponent,data: {routeName: "profile"},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'user/edit/:id', component: EditUserComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'journals', component: JournalsComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'books', component: BookListComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'editBook/:id', component: EditBookComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'book/create', component: BookCreateComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'admin/edit-profile', component: AdminEditProfileComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'chapter/create/:id', component:CreateChapterComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'editChapter/:id', component: EditChapterComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'chapter-list/:id', component: ChaptersListComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'user/create', component: CreateUserComponent,canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),MatTableModule],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
