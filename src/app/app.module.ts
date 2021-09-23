import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/components/login/login.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { ResetPinComponent } from './auth/components/reset-pin/reset-pin.component';
import { JournalsComponent } from './modules/journals/journals.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BookListComponent } from './modules/book-list/book-list.component';
import { BookCreateComponent } from './modules/book-list/book-create/book-create.component';
import { EditBookComponent } from './modules/book-list/edit-book/edit-book.component';
import { EditorModule } from '@progress/kendo-angular-editor';
import { AuthGuard } from './guard';
import { PageNotfoundComponent } from './modules/page-notfound/page-notfound.component';
import { AdminEditProfileComponent } from './modules/admin-edit-profile/admin-edit-profile.component';
import { ChaptersListComponent } from './modules/book-list/chapters-list/chapters-list.component';
import { CreateChapterComponent } from './modules/book-list/chapters-list/create-chapter/create-chapter.component';
import { EditChapterComponent } from './modules/book-list/chapters-list/edit-chapter/edit-chapter.component';
import { CreateUserComponent } from './modules/create-user/create-user.component';
import { DataTablesModule } from "angular-datatables";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { EditUserComponent } from './modules/edit-user/edit-user.component';
import { BlogsComponent } from './modules/blogs/blogs.component';
import { CreateBlogComponent } from './modules/blogs/create-blog/create-blog.component';
import { EditBlogComponent } from './modules/blogs/edit-blog/edit-blog.component';
import { NewsComponent } from './modules/news/news.component';
import { CreateNewsComponent } from './modules/news/create-news/create-news.component';
import { EditNewsComponent } from './modules/news/edit-news/edit-news.component';
import { TvComponent } from './modules/tv/tv.component';
import { CreateTvComponent } from './modules/tv/create-tv/create-tv.component';
import { EditTvComponent } from './modules/tv/edit-tv/edit-tv.component';
import { TodosComponent } from './modules/todos/todos.component';
import { InformationComponent } from './modules/information/information.component';
import { CreateInfoComponent } from './modules/information/create-info/create-info.component';
import { EditInfoComponent } from './modules/information/edit-info/edit-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    ResetPinComponent,
    JournalsComponent,
    BookListComponent,
    BookCreateComponent,
    EditBookComponent,
    PageNotfoundComponent,
    AdminEditProfileComponent,
    ChaptersListComponent,
    CreateChapterComponent,
    EditChapterComponent,
    CreateUserComponent,
    EditUserComponent,
    BlogsComponent,
    CreateBlogComponent,
    EditBlogComponent,
    NewsComponent,
    CreateNewsComponent,
    EditNewsComponent,
    TvComponent,
    CreateTvComponent,
    EditTvComponent,
    TodosComponent,
    InformationComponent,
    CreateInfoComponent,
    EditInfoComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule,
    NgxUiLoaderModule
  ],
 providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},[AuthGuard]],
  bootstrap: [AppComponent]
})
export class AppModule { }
