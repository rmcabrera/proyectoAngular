import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable()
export class MockAngularFireAuth {
  authState = of({ uid: 'mockUserId' } as firebase.User);
  currentUser = Promise.resolve({ uid: 'mockUserId' } as firebase.User);

  signInWithEmailAndPassword = jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({
    user: { uid: 'mockUserId' },
    getIdToken: jasmine.createSpy('getIdToken').and.returnValue(Promise.resolve('mockIdToken')) 
  }));

  signOut = jasmine.createSpy('signOut').and.returnValue(Promise.resolve());

  createUserWithEmailAndPassword = jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({
    user: { uid: 'mockUserId' }
  }));

  sendPasswordResetEmail = jasmine.createSpy('sendPasswordResetEmail').and.returnValue(Promise.resolve());

  signInWithPopup = jasmine.createSpy('signInWithPopup').and.returnValue(Promise.resolve({
    user: { uid: 'mockUserId' }
  }));
}

export class MockRouter {
  navigate = jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true));
}
