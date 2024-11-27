import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  message: string = '';
  errorMessage: string = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  // Método para manejar el formulario de restablecimiento de contraseña
  onResetPassword() {
    if (this.email) {
      this.authService.resetPassword(this.email).subscribe(
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