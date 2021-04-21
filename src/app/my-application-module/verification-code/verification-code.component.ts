import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApplicationDbServiceService } from '../application-db-service.service';
import { IDocument } from '../document.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ResponsiveService } from 'src/app/responsive.service';

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
  invocationCounter: number = 0;
  companyName: string = '';
  validationClass: string = "";

  constructor(protected dbService: ApplicationDbServiceService) { }

  @Input()
  isMobile!: boolean;

  ngOnInit(): void {
  }

  async onOtpChange(verificationCode: string){
    if(verificationCode.length == 6){
      this.invocationCounter = this.invocationCounter + 1;
      this.isFullLength = true;
      if(this.invocationCounter <= 10){ //to prevent thousands of webservice calls
        this.documentList = await this.getDocumentList(verificationCode);
        if(this.documentList.length > 0){
          this.fillDocumentListWithDefaultValues(this.documentList);
          this.isVerified = true;
        }
      }
    } 
    else {
      this.invocationCounter = 0;
      this.isFullLength = false;
      this.isVerified = false;
    }
  }

  async getDocumentList(verificationCode: string){
    await this.dbService.getDocumentListByVerificationCode(verificationCode)
                  .then((res: Array<IDocument>) => {
                        this.documentList = res;
                  });
    
    return this.documentList;
  }

  fillDocumentListWithDefaultValues(documentList: IDocument[]){
    this.addDefaultValuesToExistingDocument(documentList[0]);
    documentList.push({id: 1, companyName: documentList[0].companyName, name: "Lebenslauf", filePath: "/files/pdf/Lebenslauf.pdf", verificationCode: ""});
    documentList.push({id: 2, companyName: documentList[0].companyName, name: "Zwischenzeugnis SDL", filePath: "/files/pdf/Zwischenzeugnis_SDL.pdf", verificationCode: ""});
    documentList.push({id: 3, companyName: documentList[0].companyName, name: "Zeugnisse", filePath: "/files/pdf/Zeugnisse.pdf", verificationCode: ""});
    documentList.push({id: 4, companyName: documentList[0].companyName, name: "Zertifikate", filePath: "/files/pdf/Zertifikate.pdf", verificationCode: ""});
  }

  addDefaultValuesToExistingDocument(document: IDocument){
    document.name = "Motivationsschreiben";
  }
}
