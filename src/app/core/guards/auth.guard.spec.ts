import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticatedToken']);
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if authenticated', () => {
    authService.isAuthenticatedToken.and.returnValue(true);
    
    const route = {} as any; 
    const state = {} as any; 

    const result = authGuard.canActivate(route, state);
    expect(result).toBe(true); 
  });

  it('should deny activation and redirect if not authenticated', () => {
    authService.isAuthenticatedToken.and.returnValue(false); 
    spyOn(router, 'navigate'); 

    const route = {} as any;
    const state = {} as any;

    const result = authGuard.canActivate(route, state);
    expect(result).toBe(false); 
    expect(router.navigate).toHaveBeenCalledWith(['/login']); 
  });
});
