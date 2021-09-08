import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';
import { TvService } from 'src/app/services/tv.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  
  dtOptions: DataTables.Settings = {};
  tv:any;
  dtTrigger: Subject<any> = new Subject<any>();
 
  error:any;
  success:any;
  ImgUrl=environment.imgURL+'tv/';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
   
  ) { }
 
  ngOnInit(): void {
    this.authService.setTitle('Todos');
    this.dtOptions = {
      pageLength: 20
    };
    this.gettvs();
  }

  gettvs = () =>{
    this.todoService.todoListing()
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
    this.todoService.deleteTodo(id)
    .subscribe(
      data =>{
        this.success = 'todo Deleted Successfully';
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
