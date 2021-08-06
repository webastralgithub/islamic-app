import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public events: string[] = [];
  public value = ``;

  public valueChange(value: any): void {
    this.log("valueChange", value);
  }

  private log(event: string, arg: any): void {
    this.events.push(`${event} ${arg || ""}`);
    console.log(this.events);
    
  }
  storeBook = () =>{
    
  }
}
