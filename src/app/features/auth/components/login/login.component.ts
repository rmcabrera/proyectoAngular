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
    private route: ActivatedRoute // Para obtener los parámetros de la ruta
  ) {}

  async onSubmit() {
    try {
      const token = await this.authService.login(this.email, this.password);
      localStorage.setItem('token', token || '');
      console.log('Inicio de sesión exitoso. Token:', token);
      //this.toastr.success('Operación exitosa', 'Exito');
      // Redirigir al usuario a la página anterior o al inicio por defecto
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
          this.router.navigate(['/dashboard']); // Redirige al dashboard después del login
        },
        (error) => {
          console.error('Error de login con Google:', error);
        }
      );
    }

}
