import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { VerificationCodeComponent } from './my-application-module/verification-code/verification-code.component';

const routes: Routes = [
  { path: 'imprint', component: ImprintComponent},
  { path: 'home', component: VerificationCodeComponent},
  { path: '**', redirectTo: '/home'},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
