import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyApplicationModuleModule } from './my-application-module/my-application-module.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyApplicationModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
