import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatTableModule } from '@angular/material/table';
import { JournalsComponent } from '../modules/journals/journals.component';
import { BookListComponent } from '../modules/book-list/book-list.component';
import { EditBookComponent } from '../modules/book-list/edit-book/edit-book.component';
import { BookCreateComponent } from '../modules/book-list/book-create/book-create.component';



const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'users', loadChildren: () => import('./../modules/home/home.module').then(m => m.HomeModule ) }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'userProfile/:id', component: UserProfileComponent }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'journals', component: JournalsComponent }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'books', component: BookListComponent }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'editBook/:id', component: EditBookComponent }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'book/create', component: BookCreateComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),MatTableModule],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
