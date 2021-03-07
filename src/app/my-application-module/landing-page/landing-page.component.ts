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
import * as JSZip from 'jszip';  //npm i jszip 
import * as FileSaver from 'file-saver';

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
  selectedFileArr = new Array();
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
    if(this.selectedFileArr.indexOf(index)  === -1) {
      return true;
    }
    return false;
  }

  addSelectedItem(index: number){
    this.selectedFileArr.push(index); //add
  }

  removeSelectedItem(index: number){
    const _index = this.selectedFileArr.indexOf(index);
    this.selectedFileArr.splice(_index, 1); //remove
  }

  async downloadSelected(){    
    const zip = new JSZip();
    const name = "Bewerbungsunterlagen Nicolas Hormesch" + '.zip';  

    for(var i = 0; i < this.selectedFileArr.length; i++){
      var index = this.selectedFileArr[i];
      var document = this.documentList[index];
      const fileData: any = await this.downloads.getFileByFilePath(document.filePath);
      const blob: any = new Blob([fileData], { type: 'application/pdf'});
      zip.file(document.name+'.pdf', blob);    
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {  
      if (content) {  
        //FileSaver.saveAs(content, name);  
        saveAs(content, name);
      }  
    });
  }
}
