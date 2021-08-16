import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/models/book';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books!:Book[];
  error:any;
  success:any;
  ImgUrl=environment.imgURL+'books/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BooksService
   
  ) { this.getBooks(); }

  ngOnInit(): void {
  }

  getBooks = () =>{
    this.bookService.bookList()
    .pipe(first())
    .subscribe(
      book =>{
        this.books = book.data;
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )

  }
  deleteBook(id:string){
    var status = confirm("Do You want to delete this book ?");
    if(!status){
      return;
    }
    this.bookService.deleteBook(id)
    .pipe(first())
    .subscribe(
      data =>{
        this.success = 'Book Deleted Successfully';
        this.getBooks();
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )
    
  }



}
