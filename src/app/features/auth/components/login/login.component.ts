import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ''; // Almacena el email ingresado
  password: string = ''; // Almacena la contraseña ingresada
  rememberMe: boolean = false; // Almacena el estado de la casilla "Remember Me"

  constructor( private authService: AuthService, private router: Router) {

  }

  onLogin() {
    
    if(this.authService.login(this.email, this.password)){
      this.router.navigate(['/tasks']);  
      return;
    } 
  }
}
