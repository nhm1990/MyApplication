import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { LandingPageComponent } from './my-application-module/landing-page/landing-page.component';
import { VerificationCodeComponent } from './my-application-module/verification-code/verification-code.component';

const routes: Routes = [
  { path: 'imprint', component: ImprintComponent},
  { path: 'verificationCode', component: VerificationCodeComponent},
  { path: 'download', component: LandingPageComponent},
  { path: '**', component: VerificationCodeComponent},
  { path: '',   redirectTo: '/verificationCode', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
