import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { Information } from 'src/app/models/information';
import { AuthService } from 'src/app/services/auth.service';
import { InformationService } from 'src/app/services/information.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  
  dtOptions: DataTables.Settings = {};
  informations: Information[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
 
  error:any;
  success:any;
  ImgUrl=environment.imgURL+'books/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InformationService,
    private ngxService: NgxUiLoaderService,
    private authService:AuthService
   
  ) { }
 
  ngOnInit(): void {
    this.authService.setTitle('Informations');
    this.dtOptions = {
      pageLength: 20
    };
    this.getBooks();
  }

  getBooks = () =>{
    this.infoService.infoList()
    .subscribe(data => {
      this.ngxService.start(); 
      setTimeout(() => {
        this.ngxService.stop(); 
      }, 1000);
      this.informations = (data as any).data;
      this.dtTrigger.next();
    });

  }
  deleteInfo(id:string){
    var status = confirm("Do You want to delete this book ?");
    if(!status){
      return;
    }
    this.infoService.deleteInfo(id)
    .subscribe(
      data =>{
        this.success = 'informations Deleted Successfully';
        window.location.reload();
      },
      error =>{
        console.log(error);
        
        this.error = error.error.msg;
        
      }
    )
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
