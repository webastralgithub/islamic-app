import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
// import {first} from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/models/book';
import { Subject } from 'rxjs';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  books: Book[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
 
  error:any;
  success:any;
  ImgUrl=environment.imgURL+'books/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BooksService,
    private ngxService: NgxUiLoaderService,
    private authService:AuthService
   
  ) { }
 
  ngOnInit(): void {
    this.authService.setTitle('Books');
    this.dtOptions = {
      pageLength: 20
    };
    this.getBooks();
  }

  getBooks = () =>{
    this.bookService.bookList()
    .subscribe(data => {
      this.ngxService.start(); 
      setTimeout(() => {
        this.ngxService.stop(); 
      }, 1000);
      this.books = (data as any).data;
      this.dtTrigger.next();
    });

  }
  deleteBook(id:string){
    var status = confirm("Do You want to delete this book ?");
    if(!status){
      return;
    }
    this.bookService.deleteBook(id)
    .subscribe(
      data =>{
        this.success = 'Book Deleted Successfully';
        window.location.reload();
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
