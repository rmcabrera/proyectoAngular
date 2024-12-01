import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  errorMessage: string = '';
  registerForm!: FormGroup;
  
  constructor(private authService: AuthService, 
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error('Por favor, verifica los datos ingresados', 'Error');
      return;
    }
  
    const { email, password } = this.registerForm.value; // Obtener valores directamente del formulario reactivo
  
    this.authService.register(email, password).subscribe(
      (userCredential) => {
        // Registro exitoso
        console.log('Registro exitoso:', userCredential);
        this.toastr.success('Usuario registrado exitosamente', 'Éxito');
        this.router.navigate(['/main']);
      },
      (error) => {
        // Manejo de errores
        this.errorMessage = error.message || 'Error desconocido al registrar usuario';
        this.toastr.error('Error al registrar usuario', 'Error');
        console.error('Error de registro:', error);
      }
    );
  }
  
}
