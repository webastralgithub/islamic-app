import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { TvService } from 'src/app/services/tv.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  tv:any;
  dtTrigger: Subject<any> = new Subject<any>();
 
  error:any;
  success:any;
  ImgUrl=environment.imgURL+'tv/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvService: TvService,
    private ngxService: NgxUiLoaderService
   
  ) { }
 
  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 5
    };
    this.gettvs();
  }

  gettvs = () =>{
    this.tvService.tvList()
    .subscribe(data => {
      this.ngxService.start(); 
      setTimeout(() => {
        this.ngxService.stop(); 
      }, 1000);
      this.tv = (data as any).data;
      console.log(this.tv);
      
      this.dtTrigger.next();
    });

  }
  deletetv(id:string){
    var status = confirm("Do You want to delete this tv ?");
    if(!status){
      return;
    }
    this.tvService.deletetv(id)
    .subscribe(
      data =>{
        this.success = 'tv Deleted Successfully';
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
