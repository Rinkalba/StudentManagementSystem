import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';



import {CdkMenuModule} from '@angular/cdk/menu';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {  RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { Auth } from './services/auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserFormComponent } from './components/user-form/user-form.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';

import {MatTableModule, _MatTableDataSource} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {Sort, MatSortModule, SortDirection} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { EducationFormComponent } from './components/education-form/education-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {ToastrModule} from 'ngx-toastr';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordLinkComponent } from './components/forgot-password-link/forgot-password-link.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    NotfoundComponent,
    AdminComponent,
    UserComponent,
    UserFormComponent,
    AdminFormComponent,
    EditUserComponent,
    EducationFormComponent,
    ForgotPasswordComponent,
    OtpFormComponent,
    ResetPasswordComponent,
    ForgotPasswordLinkComponent,
    
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatInputModule,
    CdkMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
     
    })
   
    
  ],
  providers: [Auth,[{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
