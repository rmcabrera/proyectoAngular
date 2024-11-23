import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = 'rcabrerac@gmail.com'; 
  password: string = 'sunatdevelop'; 
  rememberMe: boolean = false; 
  errorMessage : string = '';

  constructor( private authService: AuthService, private router: Router) {

  }

  async onSubmit() {
        try {
        const token = await this.authService.login(this.email, this.password);
        localStorage.setItem('token', token || '');
        console.log('Inicio de sesión exitoso. Token:', token);
        this.router.navigate(['/tasks']);
      } catch (error) {
        this.errorMessage = 'Error al iniciar sesión. Intente de nuevo.';
        console.error('Error al iniciar sesión:', error);
      }

  }
}
