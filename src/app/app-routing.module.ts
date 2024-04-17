import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Auth } from './services/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordLinkComponent } from './components/forgot-password-link/forgot-password-link.component';

const routes: Routes = [
  {path:'',redirectTo:"/register",pathMatch:'full'},
  {path:'register', component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:"home",component:HomeComponent,pathMatch:"full",canActivate:[Auth]},
  {path:"admin",component:AdminComponent,canActivate:[Auth]},
  {path:"user",component:UserComponent,canActivate:[Auth]},
  {path:"userForm",component:UserFormComponent,canActivate:[Auth]},
  {path:"adminForm",component:AdminFormComponent,canActivate:[Auth]},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"reset-password",component:ResetPasswordComponent},
  {path:"forgot-password-link",component:ForgotPasswordLinkComponent},
  {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
