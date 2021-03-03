import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApplicationDbServiceService } from '../application-db-service.service';
import { IDocument, Document } from '../document.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { saveAs } from 'file-saver'; //npm install file-saver / npm install @types/file-saver --save-dev

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
  animations: [
    // animation triggers go here
    trigger('showErrorMessage', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class VerificationCodeComponent implements OnInit {

  isVerified: boolean = false;
  isFullLength: boolean = false;
  documentList: IDocument[] = [];
  testPdf: any;

  constructor(protected dbService: ApplicationDbServiceService) { }

  ngOnInit(): void {
  }

  async onOtpChange(verificationCode: string){
    if(verificationCode.length == 6){
      this.isFullLength = true;
      this.documentList = await this.getDocumentListWithVerificationCode(verificationCode);
      if(this.documentList.length > 0){
        this.isVerified = true;
        //var filePath = this.documentList[0].filePath;
      }
    }
    else {
      this.isFullLength = false;
      this.isVerified = false;
    }
  }

  async getDocumentListWithVerificationCode(verificationCode: string){
    const params = new HttpParams().set('params', verificationCode);
    await this.dbService.getDocuments(params)
                  .then((res: Array<IDocument>) => {
                        this.documentList = res;
                  });
    
    return this.documentList;
  }
}
