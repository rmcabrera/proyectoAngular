import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  onRegister() {
    if (this.email && this.password) {
      this.authService.register(this.email, this.password).subscribe(
        (userCredential) => {
          // Registro exitoso, redirige al usuario a la página principal
          console.log('Registro exitoso:', userCredential);
          this.router.navigate(['/main']);
        },
        (error) => {
          // En caso de error, muestra el mensaje de error
          this.errorMessage = error.message;
          console.error('Error de registro:', error);
        }
      );
    } else {
      this.errorMessage = 'Por favor ingresa un correo y una contraseña.';
    }
  }
}
