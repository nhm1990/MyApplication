import { Component, OnInit } from '@angular/core';
import { ApplicationDbServiceService } from '../application-db-service.service';
import { IDocument, Document } from '../document.model';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {

  isVerified: boolean = false;
  constructor(protected dbService: ApplicationDbServiceService) { }

  ngOnInit(): void {
  }

  onOtpChange(verificationCode: string){
    if(verificationCode.length == 6){
      console.log("TEMPTESTNH34636434 event: " + verificationCode);
      var myDocument = new Document(0, "", "", verificationCode);
      console.log("TEMPTESTNH34636434 myDocument.verificationCode : " + myDocument.verificationCode);

      this.checkIsValidVerificationCode(myDocument);
    }
  }

  checkIsValidVerificationCode(myDocument: Object){
    this.dbService.getDocuments(myDocument)
                  .then((result: Array<IDocument>) => {
                    
                    throw "TEMPTESTNH8734634634 result: " + result;
                    this.isVerified = true;
                  });
  }


}
