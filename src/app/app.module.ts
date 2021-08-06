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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule
  ],
 providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
