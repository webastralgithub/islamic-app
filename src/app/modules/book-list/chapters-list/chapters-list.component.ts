import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Chapter } from 'src/app/models/chapter';
import { ChaptersService } from 'src/app/services/chapters.service';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss']
})
export class ChaptersListComponent implements OnInit {

  constructor(public fb: FormBuilder,private chapterService: ChaptersService,private _Activatedroute:ActivatedRoute, private http: HttpClient,private router:Router) {
    this.getChapter();
   }
  chapters!:Chapter[];
  error!:string;
  bookid!:any;
  ngOnInit() {}

   getChapter = () => {
    this._Activatedroute.paramMap.subscribe(params => { 
    this.bookid = params.get('id');
    this.chapterService.bookChapters(params.get('id')).subscribe((res)=>{
    this.chapters = res.data;
  });
});
   

 }

  deleteChapter(id:string){
    
  this.chapterService.deleteChapter(id).subscribe((res) =>{
  console.log(res);
  this.getChapter();
})

  }
}
