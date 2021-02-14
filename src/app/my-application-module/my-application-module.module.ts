import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LandingPageComponent, VerificationCodeComponent],
  imports: [
    CommonModule,
    NgOtpInputModule,
    HttpClientModule
  ],
  exports: [
    LandingPageComponent,
    VerificationCodeComponent,
    BrowserModule,
    BrowserAnimationsModule
  ]
})
export class MyApplicationModuleModule { 
}
