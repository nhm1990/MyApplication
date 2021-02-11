import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {

  isVerified: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onOtpChange(event: any){
    if(event.length == 6){
      this.isVerified = true;
    }
  }

}
