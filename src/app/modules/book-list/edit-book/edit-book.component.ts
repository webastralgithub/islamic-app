import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BooksService } from 'src/app/services/books.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  imageSrc!: string;
  edit_book_form: FormGroup;
  bookid!:any;
  fileData:any;
  currentUser:any
    constructor(public fb: FormBuilder,private bookService: BooksService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
      this.edit_book_form = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        author: ['', Validators.required],
        image: ['', Validators.required]
      });
    
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success: boolean=false;
  public events: string[] = [];
  public value = `Heyy user`;
  book:any;
  ImgUrl=environment.imgURL+'books/';
  
  ngOnInit() {

    this._Activatedroute.paramMap.subscribe(params => { 

          this.bookid = params.get('id');
      this.bookService.editBook(params.get('id')).subscribe((res)=>{
        this.book = res;
        console.log(this.book.title);
        this.edit_book_form.patchValue({
          title: this.book.title,
          description: this.book.description,
          author: this.book.author,
          image: this.book.image
      });
  });
});

   }
  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  private log(event: string, arg: any): void {
    this.events.push(`${event} ${arg || ""}`);
    console.log(this.events);
    
  }
  uploadFile(event:any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    // console.log(file);
    reader.readAsDataURL(file);
    
    reader.onload = () => {
 
      this.imageSrc = reader.result as string;
      // console.log(file.name);
    
    this.edit_book_form.patchValue({
      image: file,
      fileData: file,
    });
    this.edit_book_form.get('image')!.updateValueAndValidity();
  }

}
get f(){ return this.edit_book_form.controls;}
    submitForm =() => {
      this.submitted = true;
      if(this.edit_book_form.status == 'INVALID'){
        
        return;
      }
      console.log(this.edit_book_form.get('image')!.value);
      var formData: any = new FormData();
      formData.append("title", this.edit_book_form.value.title);
      formData.append("image", this.edit_book_form.get('image')!.value);
      formData.append("description", this.edit_book_form.value.description);
      formData.append("author", this.edit_book_form.value.author);
      console.log(formData);
      this.bookService.updateBook(formData,this.bookid).pipe(first())
      .subscribe(
        data =>{
  
          console.log(data);
          this.success=true;
          this.router.navigate(['dashboard/books']);
          
        },
        error =>{
          this.error = error;
          console.log(error)
        }
      );
    }

}
