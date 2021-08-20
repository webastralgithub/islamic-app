import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Chapter } from 'src/app/models/chapter';
import { ChaptersService } from 'src/app/services/chapters.service';
import { Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss']
})
export class ChaptersListComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private ngxService: NgxUiLoaderService,public fb: FormBuilder,private chapterService: ChaptersService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
   
   }
  chapters!:any;
  error!:string;
  bookid!:any;
  ngOnInit(): void {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getChapter();
  }

   getChapter = () => {
    this._Activatedroute.paramMap.subscribe(params => { 
    this.bookid = params.get('id');
    this.chapterService.bookChapters(params.get('id')).subscribe((res)=>{
      this.ngxService.start(); 
      setTimeout(() => {
        this.ngxService.stop(); 
      }, 1000);
    this.chapters = res.data;
    this.dtTrigger.next();
  });
});
   

 }

  deleteChapter(id:string){
    
  this.chapterService.deleteChapter(id).subscribe((res) =>{
    window.location.reload();
  })

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
