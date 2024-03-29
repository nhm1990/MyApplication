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
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('enterComponent', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('showErrorMessage', [
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
  isNoSelection: boolean = false;
  constructor(private downloads: DownloadService ) {}

  ngOnInit(): void {  }

  @Input()
  documentList!: IDocument[];

  multiSelect(index: number){
    this.isNoSelection = false;
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
    this.selectedFileArr.push(index);
  }

  removeSelectedItem(index: number){
    const _index = this.selectedFileArr.indexOf(index);
    this.selectedFileArr.splice(_index, 1);
  }

  async downloadSelected(){  
    var isValid = this.validateSelection();
    if(isValid == false){
      return;
    }

    const zip = new JSZip();
    const name = "Bewerbungsunterlagen Nicolas Hormesch.zip";  

    for(var i = 0; i < this.selectedFileArr.length; i++){
      var index = this.selectedFileArr[i];
      var document = this.documentList[index];
      const fileData: any = await this.downloads.getFileByFilePath(document.filePath);
      const blob: any = new Blob([fileData], { type: 'application/pdf'});
      zip.file(document.name+'.pdf', blob);    
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {  
      if (content) {  
        FileSaver.saveAs(content, name);
      }  
    });
  }

  validateSelection(){
    if(this.selectedFileArr.length == 0){
      this.isNoSelection = true;
      return false;
    }
    this.isNoSelection = false;
    return true;
  }
}
