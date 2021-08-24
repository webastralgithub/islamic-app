import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { ChaptersService } from 'src/app/services/chapters.service';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.scss']
})
export class EditChapterComponent implements OnInit {

  edit_chapter: FormGroup;
  books:any;
  booksId:any;
  fileData:any;
  currentUser:any
    constructor(public fb: FormBuilder,private _Activatedroute:ActivatedRoute,private chapterService: ChaptersService,private bookService:BooksService, private http: HttpClient,private router:Router) {
      this.edit_chapter = this.fb.group({
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
  chapterId:any;
  chapter:any;
  ngOnInit() {

    this._Activatedroute.paramMap.subscribe(params => { 

      this.chapterId = params.get('id');
      this.chapterService.editChapter(params.get('id')).subscribe((res)=>{
      this.chapter = res;
      this.edit_chapter.patchValue({
        title: this.chapter.title,
        description: this.chapter.description,
        book_id: this.chapter.book_id,
    });
  
  });
  });
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

get f(){ return this.edit_chapter.controls;}
    updateChapter =() => {
      this.booksId = {
        _id:this.f.book_id.value
      }
      console.log(this.booksId);
      
      this.chapterService.updateChapter(this.f.title.value,this.f.description.value,this.f.book_id.value,this.booksId,this.chapterId).pipe(first())
      .subscribe(
        data =>{
          this.success =true;
          console.log(data);
          
          // this.router.navigate(['dashboard/chapter-list/'+this.chapter.book_id]);       
        },
        error =>{
          this.error = error;
          console.log(error)
        }
      );
    }

}
 