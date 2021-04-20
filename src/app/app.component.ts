import { Component } from '@angular/core';
import { ResponsiveService } from './responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyApplication';
  isMobile: boolean = false;

  constructor(private responsiveService:ResponsiveService){
  }

  ngOnInit(){
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        //console.log('Mobile device detected');
      }
      else{
        //console.log('Desktop detected')
      }
      this.isMobile = isMobile;
    });
    this.onResize();    
  }

  onResize(){
    this.responsiveService.checkWidth();
  }
}
