import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{

  isImprint: boolean = false;

  @Input()
  isMobile!: boolean;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    /*const valueChange = changes['isMobile'];
    if (valueChange) {
      console.log("TEMPTESTNH IS MOBILE FOOTER ON CHANGES: " + this.isMobile);
      console.log(changes);
    }*/
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
