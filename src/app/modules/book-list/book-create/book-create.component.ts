import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

//Import Form
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import {first} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  imageSrc!: string;
  form: FormGroup;

  fileData:any;
  currentUser:any
    constructor(public fb: FormBuilder,private bookService: BooksService, private http: HttpClient,private router:Router) {
      this.form = this.fb.group({
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
  success!: string;
  public events: string[] = [];
  public value = ``;
  
  ngOnInit() { }
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
    
    this.form.patchValue({
      image: file,
      fileData: file,
    });
    this.form.get('image')!.updateValueAndValidity();
  }

}
get f(){ return this.form.controls;}
    submitForm =() => {
      
      console.log(this.form.status);
      this.submitted = true;
      if(this.form.status == 'INVALID'){
        console.log(this.form.value);
        
        return;
      }
      // return 'heyy';
      
      var formData: any = new FormData();
      formData.append("title", this.form.value.title);
      formData.append("image", this.form.get('image')!.value);
      formData.append("description", this.form.value.description);
      formData.append("author", this.form.value.author);
      this.bookService.storeBook(formData).pipe(first())
      .subscribe(
        data =>{
  
          console.log(data);
          this.router.navigate(['dashboard/books']);
          
        },
        error =>{
          this.error = error;
          console.log(error)
        }
      );
    }


}