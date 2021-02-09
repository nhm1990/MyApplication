import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {


  
  constructor() { }

  ngOnInit(): void {
  }

  documentList: documentList[] = [
      {id: 0, name: "Motivationsschreiben", cssClass: "btn green", imgPath: 'assets/icons8-regular-document-64.png'}, 
      {id: 1, name: "Lebenslauf", cssClass: "btn blue", imgPath: 'assets/icons8-submit-resume-80.png'},    
      {id: 2, name: "Zwischenzeugniss SDL", cssClass: "btn yellow", imgPath: 'assets/icons8-certificate-64.png'}, 
      {id: 3, name: "Zeugnisse", cssClass: "btn red", imgPath: 'assets/icons8-certificate-64.png'}, 
  ]

  fillColor = 'rgb(255, 0, 0)';

  changeColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    this.fillColor = `rgb(${r}, ${g}, ${b})`;
  }


}

interface documentList {
  id: number; 
  name: string; 
  cssClass: string;
  imgPath: string;
}
