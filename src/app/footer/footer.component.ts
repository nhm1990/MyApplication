import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isImprint = false;

  constructor() { }

  ngOnInit(): void {
  }

  showHideImprint(){
    if(this.isImprint){
      this.isImprint = false; 
    }
    else {
      this.isImprint = true;
    }
  }

}
