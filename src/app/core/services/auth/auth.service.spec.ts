import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';

// Mock de AngularFireAuth
export class MockAngularFireAuth {
  authState = of({ uid: 'mockUserId' } as firebase.User);
  currentUser = Promise.resolve({ uid: 'mockUserId' } as firebase.User);

  // Mock de signInWithEmailAndPassword
  signInWithEmailAndPassword = jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({
    user: { 
      uid: 'mockUserId',
      getIdToken: jasmine.createSpy('getIdToken').and.returnValue(Promise.resolve('mockIdToken')) 
    }
  }));

  // Mock de signOut
  signOut = jasmine.createSpy('signOut').and.returnValue(Promise.resolve());

  // Mock de createUserWithEmailAndPassword
  createUserWithEmailAndPassword = jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({
    user: { uid: 'mockUserId' }
  }));

  // Mock de sendPasswordResetEmail
  sendPasswordResetEmail = jasmine.createSpy('sendPasswordResetEmail').and.returnValue(Promise.resolve());

  // Mock de signInWithPopup
  signInWithPopup = jasmine.createSpy('signInWithPopup').and.returnValue(Promise.resolve({
    user: { 
      uid: 'mockUserId',
      getIdToken: jasmine.createSpy('getIdToken').and.returnValue(Promise.resolve('mockIdToken'))
    }
  }));
}

// Mock del Router
export class MockRouter {
  navigate = jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true));
}

describe('AuthService', () => {
  let service: AuthService;
  let afAuth: MockAngularFireAuth;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        { provide: Router, useClass: MockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
    afAuth = TestBed.inject(AngularFireAuth) as any;
    router = TestBed.inject(Router) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log out successfully', async () => {
    await service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should log in successfully and store token in localStorage', async () => {
    const token = await service.login('user@example.com', 'password');
    expect(token).toBe('mockIdToken');
    expect(localStorage.getItem('authToken')).toBe('mockIdToken');
    expect(localStorage.getItem('userName')).toBeDefined(); 
  });

  it('should check if user is authenticated with token in localStorage', () => {
    localStorage.setItem('authToken', 'mockIdToken');
    expect(service.isAuthenticatedToken()).toBe(true);
  });

  it('should register a new user', async () => {
    const result = await service.register('newuser@example.com', 'password').toPromise();
    expect(result).toBeTruthy();
    expect(afAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith('newuser@example.com', 'password');
  });

  it('should send password reset email', async () => {
    const email = 'user@example.com';
    await service.resetPassword(email).toPromise();
    expect(afAuth.sendPasswordResetEmail).toHaveBeenCalledWith(email);
  });

  it('should login with Google and store token in localStorage', async () => {
    const user = await service.loginWithGoogle().toPromise();
    expect(user).toBeDefined();
    expect(localStorage.getItem('authToken')).toBeDefined();
    expect(localStorage.getItem('userName')).toBeDefined();
  });

  it('should get current user id', async () => {
    const userId = await service.getCurrentUserId();
    expect(userId).toBe('mockUserId');
  });

  it('should get current user and store in localStorage', async () => {
    const user = await service.getCurrentUser();
    expect(user).toBeDefined();
    expect(localStorage.getItem('userName')).toBeDefined();
  });
});
