import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
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

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute // Para obtener los parámetros de la ruta
  ) {}

  async onSubmit() {
    try {
      const token = await this.authService.login(this.email, this.password);
      localStorage.setItem('token', token || '');
      console.log('Inicio de sesión exitoso. Token:', token);

      // Redirigir al usuario a la página anterior o al inicio por defecto
      const returnUrl = '/main'; 
      this.router.navigate([returnUrl]);

    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión. Intente de nuevo.';
      console.error('Error al iniciar sesión:', error);
    }
  }

}
