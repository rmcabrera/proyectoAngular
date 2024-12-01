import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { getFirestore, Firestore } from 'firebase/firestore';

class MockFirebase {
  static getFirestore(): Firestore {
    return {} as Firestore;  
  }
}

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: getFirestore, useClass: MockFirebase }  
      ]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Firestore instance when getFirestoreInstance is called', () => {
    const firestore = service.getFirestoreInstance();
    expect(firestore).toBeInstanceOf(Firestore); 
  });
});
