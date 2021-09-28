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
import { CreateBlogComponent } from '../modules/blogs/create-blog/create-blog.component';
import { EditBlogComponent } from '../modules/blogs/edit-blog/edit-blog.component';
import { BlogsComponent } from '../modules/blogs/blogs.component';
import { NewsComponent } from '../modules/news/news.component';
import { CreateNewsComponent } from '../modules/news/create-news/create-news.component';
import { EditNewsComponent } from '../modules/news/edit-news/edit-news.component';
import { TvComponent } from '../modules/tv/tv.component';
import { CreateTvComponent } from '../modules/tv/create-tv/create-tv.component';
import { EditTvComponent } from '../modules/tv/edit-tv/edit-tv.component';
import { TodosComponent } from '../modules/todos/todos.component';
import { InformationComponent } from '../modules/information/information.component';
import { CreateInfoComponent } from '../modules/information/create-info/create-info.component';
import { EditInfoComponent } from '../modules/information/edit-info/edit-info.component';
import { NafsComponent } from '../modules/nafs/nafs.component';



const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'users',data: {title: 'Admin | Users'}, loadChildren: () => import('./../modules/home/home.module').then(m => m.HomeModule ),canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'userProfile/:id', component: UserProfileComponent,canActivate: [AuthGuard] }
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
      { path: 'journals', component: JournalsComponent,data: {title: 'Admin | Journals'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'books', component: BookListComponent,data: {title: 'Admin | Books'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'editBook/:id', component: EditBookComponent,data: {title: 'Admin | Edit Book'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'book/create', component: BookCreateComponent,data: {title: 'Admin | Create Book'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'admin/edit-profile', component: AdminEditProfileComponent,data: {title: 'Admin | Edit Profile'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'chapter/create/:id', component:CreateChapterComponent,data: {title: 'Admin | Create Chapter'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'editChapter/:id', component: EditChapterComponent,data: {title: 'Admin | Edit Chapter'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'chapter-list/:id', component: ChaptersListComponent,data: {title: 'Admin |Chapters'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'user/create', component: CreateUserComponent,data: {title: 'Admin | Create User'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'blogs', component: BlogsComponent,data: {title: 'Admin | Blogs'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'blog/create', component: CreateBlogComponent,data: {title: 'Admin | Create Blog'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'blog/edit/:id', component: EditBlogComponent,data: {title: 'Admin | Edit Blog'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'news', component: NewsComponent,data: {title: 'Admin | News'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'news/create', component: CreateNewsComponent,data: {title: 'Admin | Create News'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'news/edit/:id', component: EditNewsComponent,data: {title: 'Admin | Edit News'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'tv', component: TvComponent,data: {title: 'Admin | Tv'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'tv/create', component: CreateTvComponent,data: {title: 'Admin | Create Tv'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'tv/edit/:id', component: EditTvComponent,data: {title: 'Admin | Edit Tv'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'todos', component: TodosComponent,canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'informations', component: InformationComponent,data: {title: 'Admin | Information'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'information/create', component: CreateInfoComponent,data: {title: 'Admin | Create Information'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'information/edit/:id', component: EditInfoComponent,data: {title: 'Admin | Edit Information'},canActivate: [AuthGuard] }
    ]
  },
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'nafs/view/:id', component: NafsComponent,data: {title: 'Admin | View Nafs'},canActivate: [AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),MatTableModule],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
