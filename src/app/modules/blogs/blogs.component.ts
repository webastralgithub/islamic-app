import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  blogs: Blog[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
 
  error:any;
  success:any;
  ImgUrl=environment.imgURL+'blogs/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private ngxService: NgxUiLoaderService
   
  ) { }
 
  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 5
    };
    this.getBooks();
  }

  getBooks = () =>{
    this.blogService.blogList()
    .subscribe(data => {
      this.ngxService.start(); 
      setTimeout(() => {
        this.ngxService.stop(); 
      }, 1000);
      this.blogs = (data as any).data;
      this.dtTrigger.next();
    });

  }
  deleteBook(id:string){
    var status = confirm("Do You want to delete this Blog ?");
    if(!status){
      return;
    }
    this.blogService.deleteblog(id)
    .subscribe(
      data =>{
        this.success = 'Blog Deleted Successfully';
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
