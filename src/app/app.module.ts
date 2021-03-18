import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyApplicationModuleModule } from './my-application-module/my-application-module.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { FooterComponent } from './footer/footer.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ImprintComponent } from './imprint/imprint.component'; //npm install @angular/cdk
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component'; //npm install @angular/material 

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ImprintComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyApplicationModuleModule,
    NgOtpInputModule,
    ClipboardModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
