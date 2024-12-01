import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';  

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['resetPassword']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [ToastrModule.forRoot()], 
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message when email is provided and resetPassword is successful', () => {
    const email = 'test@example.com';
    const mockResponse = of(undefined); 

    mockAuthService.resetPassword.and.returnValue(mockResponse);
    component.resetPasswordForm.setValue({ email });

    component.onResetPassword();
    fixture.detectChanges();

    expect(component.message).toBe('Si el correo existe, se ha enviado un enlace para restablecer la contraseña.');
  });

  it('should display an error message if resetPassword fails', () => {
    const email = 'test@example.com';
    const mockErrorResponse = throwError(() => new Error('Correo no encontrado')); 

    mockAuthService.resetPassword.and.returnValue(mockErrorResponse);
    component.resetPasswordForm.setValue({ email });

    component.onResetPassword();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Error: Correo no encontrado');
  });

});
