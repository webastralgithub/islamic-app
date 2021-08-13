import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { ChaptersService } from 'src/app/services/chapters.service';

@Component({
  selector: 'app-create-chapter',
  templateUrl: './create-chapter.component.html',
  styleUrls: ['./create-chapter.component.scss']
})
export class CreateChapterComponent implements OnInit {

  imageSrc!: string;
  chapterform: FormGroup;
  books:any;
  fileData:any;
  currentUser:any
    constructor(public fb: FormBuilder,private chapterService: ChaptersService,private bookService:BooksService, private http: HttpClient,private router:Router) {
      this.chapterform = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        book_id: ['', Validators.required],
       
      });
   
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
 this.getBooks();
    }
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success: boolean =false;
  public events: string[] = [];
  public value = ``;
  
  ngOnInit() { }
  
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
  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  private log(event: string, arg: any): void {
    this.events.push(`${event} ${arg || ""}`);
    console.log(this.events);
    
  }

get f(){ return this.chapterform.controls;}
    submitForm =() => {
      // var formData: any = new FormData();
      // formData.append("title", this.f.title.value);
      // formData.append("description", this.f.description.value);
      // formData.append("author", this.f.book_id.value);
      
      this.chapterService.storeChapter(this.f.title.value,this.f.description.value,this.f.book_id.value).pipe(first())
      .subscribe(
        data =>{
          this.success =true;
          // this.router.navigate(['dashboard/chapter-list']);
          console.log(data);          
        },
        error =>{
          this.error = error;
          console.log(error)
        }
      );
    }

}
 