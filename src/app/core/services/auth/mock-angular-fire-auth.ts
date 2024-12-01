import { of } from 'rxjs'; // Para el operador `of`
import { getAuth, User } from 'firebase/auth'; // Importa el tipo User de la nueva API modular de Firebase
import { AuthService } from './auth.service'; // Tu servicio real
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

// Mock de AngularFireAuth
export class MockAuth {
  authState = of({ uid: 'mockUserId' } as User);
  currentUser = Promise.resolve({ uid: 'mockUserId' } as User);

  signInWithEmailAndPassword = jasmine.createSpy('signInWithEmailAndPassword')
    .and.returnValue(Promise.resolve({
      user: {
        uid: 'mockUserId',
        getIdToken: jasmine.createSpy('getIdToken').and.returnValue(Promise.resolve('mockIdToken'))
      }
    }));

  signOut = jasmine.createSpy('signOut').and.returnValue(Promise.resolve());

  createUserWithEmailAndPassword = jasmine.createSpy('createUserWithEmailAndPassword')
    .and.returnValue(Promise.resolve({
      user: { uid: 'mockUserId' }
    }));

  sendPasswordResetEmail = jasmine.createSpy('sendPasswordResetEmail').and.returnValue(Promise.resolve());

  signInWithPopup = jasmine.createSpy('signInWithPopup')
    .and.returnValue(Promise.resolve({
      user: {
        uid: 'mockUserId',
        getIdToken: jasmine.createSpy('getIdToken').and.returnValue(Promise.resolve('mockIdToken'))
      }
    }));
}

export class MockRouter {
  navigate = jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true));
}

describe('AuthService', () => {
  let service: AuthService;
  let auth: MockAuth;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: getAuth, useClass: MockAuth }, // Mockeamos el `getAuth`
        { provide: Router, useClass: MockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
    auth = TestBed.inject(getAuth) as any;
    router = TestBed.inject(Router) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });

  it('should log out successfully', async () => {
    await service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should log in with Google and store token in localStorage', async () => {
    await service.loginWithGoogle();
    expect(localStorage.getItem('authToken')).toBe('mockIdToken');
    expect(localStorage.getItem('userName')).toBe('Desconocido');
  });
});
