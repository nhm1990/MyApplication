import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { IDocument } from '../document.model';
import { ApplicationDbServiceService } from '../application-db-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    // animation triggers go here
    trigger('enterComponent', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class LandingPageComponent implements OnInit {
  selectedIndexArr = new Array();
  selectedIndex: any;
  documentList: IDocument[] = [];
  constructor(protected dbService: ApplicationDbServiceService) { }

  ngOnInit(): void {
    this.loadAllDocuments();
  }

  /*documentList: IDocument[] = [
      {id: 0, name: "Motivationsschreiben", imgPath: 'assets/icons8-regular-document-64.png'}, 
      {id: 1, name: "Lebenslauf", imgPath: 'assets/icons8-submit-resume-80.png'},    
      {id: 2, name: "Zwischenzeugnis SDL", imgPath: 'assets/icons8-certificate-64.png'}, 
      {id: 3, name: "Zeugnisse", imgPath: 'assets/icons8-certificate-64.png'}, 
  ]*/

  multiSelect(index: number){
    if (this.isAdd(index) == true) {
        this.addSelectedItem(index);
    } 
    else {
        this.removeSelectedItem(index);
    }
  }

  isAdd(index: number){
    if(this.selectedIndexArr.indexOf(index)  === -1) {
      return true;
    }
    return false;
  }

  addSelectedItem(index: number){
    this.selectedIndexArr.push(index); //add
  }

  removeSelectedItem(index: number){
    const _index = this.selectedIndexArr.indexOf(index);
    this.selectedIndexArr.splice(_index, 1); //remove
  }

  loadAllDocuments(){
    this.dbService
    .get()
    .then((result: Array<IDocument>) => {
      this.documentList = result;
    });
  }
}
