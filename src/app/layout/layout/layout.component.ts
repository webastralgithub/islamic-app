import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private _location: Location,public router:Router) { }

  ngOnInit(): void {
  }
  backClicked() {
    console.log('heyy');
    
  this._location.back();
}
}
