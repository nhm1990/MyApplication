import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { IDocument } from '../document.model';
import { DownloadService } from '../download.service';
import { saveAs } from 'file-saver';

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
  constructor(private downloads: DownloadService ) {}

  ngOnInit(): void {  }

  @Input()
  documentList!: IDocument[];

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

  download(filePath: string){
    //const params = new HttpParams().set('params', filePath);
    console.log("TEMPTESTNH734634634 download function invoked.");

    this.downloads
          .downloadPdfByFilePath('/api/files/pdf/testcompany/motivationsschreiben.pdf')
          .subscribe(blob => saveAs(blob, 'archive123.zip'))
  } 
}
