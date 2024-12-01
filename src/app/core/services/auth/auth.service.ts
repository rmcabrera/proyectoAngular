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

    if (token) {
      const userName = userCredential.user?.displayName || userCredential.user?.email || 'Desconocido';
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', userName);
      this.isAuthenticated = true;
    }

    return token;

   }

  async logout() {
    await this.afAuth.signOut();
    this.isAuthenticated = false;
    localStorage.removeItem('userName'); 
    this.router.navigate(['/login']);
   }

  get authState(): Observable<firebase.User | null> {
    return this.afAuth.authState; 
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return !!user;
  }

  isAuthenticatedToken(): boolean {
   // return localStorage.getItem('authToken') !== null;
    if (typeof window !== 'undefined' && !!localStorage.getItem('authToken')) {
      return true;
    }
    return false;
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
        .then(async (result) => {
          const user = result.user;

          if (user) {
            const token = await user.getIdToken();  
            const userName = user.displayName || user.email || 'Desconocido';  

            localStorage.setItem('authToken', token || '');
            localStorage.setItem('userName', userName); 

            this.isAuthenticated = true;
          }

          observer.next(user);
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


  async getCurrentUser(): Promise<firebase.User | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userName = user.displayName || user.email || 'Desconocido';
      localStorage.setItem('userName', userName);
      return user;
    }
    return null;
  }
}

