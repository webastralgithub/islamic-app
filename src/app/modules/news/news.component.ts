import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { News } from 'src/app/models/News';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

 
  dtOptions: DataTables.Settings = {};
  news: News[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
 
  error:any;
  success:any;
  ImgUrl=environment.imgURL+'news/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private ngxService: NgxUiLoaderService,
    private authService:AuthService
   
  ) { }
 
  ngOnInit(): void {
    this.authService.setTitle('News');
    this.dtOptions = {
      pageLength: 20
    };
    this.getnewss();
  }

  getnewss = () =>{
    this.newsService.newsList()
    .subscribe(data => {
      this.ngxService.start(); 
      setTimeout(() => {
        this.ngxService.stop(); 
      }, 1000);
      this.news = (data as any).data;
      this.dtTrigger.next();
    });

  }
  deletenews(id:string){
    var status = confirm("Do You want to delete this news ?");
    if(!status){
      return;
    }
    this.newsService.deletenews(id)
    .subscribe(
      data =>{
        this.success = 'news Deleted Successfully';
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
