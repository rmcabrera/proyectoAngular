import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';
import { getApps, initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    if (getApps().length === 0) {
      initializeApp(environment.firebase);
    }
  }

  getFirestoreInstance() {
    return getFirestore();
  }
}
