import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';

export class MockAngularFireAuth {
  authState = of({ uid: 'mockUserId' } as firebase.User);
  currentUser = Promise.resolve({ uid: 'mockUserId' } as firebase.User);

  signInWithEmailAndPassword = jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({
    user: { uid: 'mockUserId' }
  }));

  signOut = jasmine.createSpy('signOut').and.returnValue(Promise.resolve());

  createUserWithEmailAndPassword = jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({
    user: { uid: 'mockUserId' },
    getIdToken : { getIdToken: ''}
  }));

  sendPasswordResetEmail = jasmine.createSpy('sendPasswordResetEmail').and.returnValue(Promise.resolve());

  signInWithPopup = jasmine.createSpy('signInWithPopup').and.returnValue(Promise.resolve({
    user: { uid: 'mockUserId' }
  }));
}

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

 
});
