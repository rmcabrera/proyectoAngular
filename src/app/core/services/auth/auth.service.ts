import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private afAuth : AngularFireAuth, private router: Router) {

   }

   async login (email : string,  password : string) : Promise<string | undefined | null> {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password) ;
    const token = await userCredential.user?.getIdToken();

    return token;

   }

  async logout() {
    await this.afAuth.signOut();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
   }

  get authState(): Observable<firebase.User | null> {
    return this.afAuth.authState; 
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return !!user;
  }

  register(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          observer.next(userCredential);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  // Método para enviar un correo de reseteo de contraseña
  resetPassword(email: string): Observable<void> {
    return new Observable((observer) => {
      this.afAuth.sendPasswordResetEmail(email)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

    // Iniciar sesión con Google
    loginWithGoogle(): Observable<firebase.User | null> {
      const provider = new firebase.auth.GoogleAuthProvider();
      return new Observable((observer) => {
        this.afAuth.signInWithPopup(provider)
          .then((result) => {
            observer.next(result.user);
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null; 
  }
}
