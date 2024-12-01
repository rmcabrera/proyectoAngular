import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberMe: boolean = false; 
  errorMessage : string = '';
  user: any;
  loginForm!: FormGroup;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['rcabrerac@gmail.com', [Validators.required, Validators.email]],
      password: ['sunatdevelop', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  
  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Por favor, verifica los datos ingresados', 'Error');
      return;
    }
  
    const { email, password } = this.loginForm.value; 
  
    try {
      const token = await this.authService.login(email, password); 
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
