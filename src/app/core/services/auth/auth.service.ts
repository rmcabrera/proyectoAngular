import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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
    return await this.afAuth.signOut();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
   }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
