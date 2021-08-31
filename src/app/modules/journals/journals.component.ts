import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';

import {first} from 'rxjs/operators';
import { JournalService } from 'src/app/services/journal.service';
import { Journal } from 'src/app/models/journal';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  journals!:Journal[];
  error:any;
  success:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private journalService: JournalService,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
   
  ) {}

  ngOnInit(): void {
    this.authService.setTitle('Journal List');
    this.dtOptions = {
      pageLength: 5,
    };
    this.getJournals();
  }

  getJournals = () =>{
    this.journalService.journalListing()
    .pipe(first())
    .subscribe(
      journal =>{
        this.ngxService.start(); 
        setTimeout(() => {
          this.ngxService.stop(); 
        }, 1000);
        this.journals = journal.data;
        this.dtTrigger.next();
        
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )

  }
  deleteJournal(id:string){
    this.journalService.deleteJournal(id)
    .pipe(first())
    .subscribe(
      data =>{

        this.success = 'journal Deleted Successfully';
        window.location.reload();        
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )
    
  }
}
