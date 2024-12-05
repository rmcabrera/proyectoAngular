import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';
import { DividerModule } from 'primeng/divider'
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,    
    PasswordModule,   
    ButtonModule, 
    CheckboxModule,
    GoogleButtonComponent,
    DividerModule,
    ToastrModule
  ],
  
})
export class AuthModule { }
