import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  message: string = '';
  resetPasswordForm!: FormGroup;
  errorMessage: string = '';
 
  constructor( private fb: FormBuilder,
      private authService: AuthService, private router: Router,
      private toastr: ToastrService,) {}
 
  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }   
  // Método para manejar el formulario de restablecimiento de contraseña
  onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched(); 
      this.toastr.error('Por favor, ingresa un correo válido', 'Error');
  
      return;
    }
  
    const { email } = this.resetPasswordForm.value;
  
    if (email) {
      this.authService.resetPassword(email).subscribe(
        () => {
          this.message = 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.';
        },
        (error) => {
          this.errorMessage = 'Error: ' + error.message;
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingrese un correo electrónico.';
    }
  }
  
}