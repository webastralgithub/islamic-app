import { Component, OnInit } from '@angular/core';

//Import Router
import {Router, ActivatedRoute} from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';


import {first} from 'rxjs/operators';
import { JournalService } from 'src/app/services/journal.service';
import { Journal } from 'src/app/models/journal';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {
  journals!:Journal[];
  error:any;
  success:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private journalService: JournalService
   
  ) {
    this.getJournals();

  }
  getJournals = () =>{
    this.journalService.journalListing()
    .pipe(first())
    .subscribe(
      journal =>{

        console.log(journal.data);
        this.journals = journal.data;
        
        
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )

  }
  ngOnInit(): void {
  }
  deleteJournal(id:string){
    this.journalService.deleteJournal(id)
    .pipe(first())
    .subscribe(
      data =>{

        this.success = 'journal Deleted Successfully';
        this.getJournals();

        
      },
      error =>{
        this.error = error.error.msg;
        
      }
    )
    
  }
}
