import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  booksId:any;
  fileData:any;
  currentUser:any
    constructor(public fb: FormBuilder,private _Activatedroute:ActivatedRoute,private chapterService: ChaptersService,private bookService:BooksService, private http: HttpClient,private router:Router) {
      this.chapterform = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        book_id: ['', Validators.required],
       
      });
   
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
 this.getBooks();
 this._Activatedroute.paramMap.subscribe(params => { 
  this.bookid = params.get('id');
  // console.log(this.bookid);
  
});
    }
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success: boolean =false;
  public events: string[] = [];
  public value = ``;
  chapter_id!:string;
  bookid!:any;
  
  ngOnInit() {
    
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
  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  private log(event: string, arg: any): void {
    this.events.push(`${event} ${arg || ""}`);
    
  }

get f(){ return this.chapterform.controls;}
    submitForm =() => {
      this.booksId = {
        _id:this.bookid
      }
      this.chapterService.storeChapter(this.f.title.value,this.f.description.value,this.bookid,this.booksId).pipe(first())
      .subscribe(
        data =>{
          this.success =true;
          this.router.navigate(['dashboard/chapter-list/'+this.bookid]);  
        },
        error =>{
          this.error = error;
        }
      );
    }

}
 