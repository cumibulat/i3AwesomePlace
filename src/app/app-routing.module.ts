import { LoginPageModule } from './../pages/login/login.module';
import { AuthGuard } from '../guards/auth';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageModule } from '../pages/register/register.module';
 
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageModule },
  { path: 'register', component: RegisterPageModule },
  // { 
  //   path: 'members', 
  //   canActivate: [AuthGuard],
  //   component: './member-routing.module'
  // },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }