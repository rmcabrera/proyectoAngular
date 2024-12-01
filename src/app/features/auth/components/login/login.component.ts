import { Component } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  user: any;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  async onSubmit() {
    try {
      const token = await this.authService.login(this.email, this.password);
      localStorage.setItem('authToken', token || '');
      console.log('Inicio de sesión exitoso. Token:', token);
      
      const returnUrl = '/main'; 
      this.router.navigate([returnUrl]);

    } catch (error) {
      console.log("ERROR EN LOGIN");
      this.toastr.error('Error al iniciar sesión', 'Error');
      this.errorMessage = 'Error al iniciar sesión. Intente de nuevo.';
      console.error('Error al iniciar sesión:', error);
      
    }
  }

    // Método para iniciar sesión con Google
    loginWithGoogle() {
      this.authService.loginWithGoogle().subscribe(
        (user) => {
          this.user = user;
          console.log('Usuario logueado:', user);
          console.log('TOKEN:', this.user.getIdToken());
          localStorage.setItem('authToken', this.user.getIdToken() || '');
          this.router.navigate(['/main']); // Redirige al dashboard después del login
        },
        (error) => {
          console.error('Error de login con Google:', error);
        }
      );
    }

}
