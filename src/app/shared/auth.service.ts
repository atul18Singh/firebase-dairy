import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
        localStorage.setItem('token', 'true');
        this.isLoggedIn();
        this.router.navigate(['./dashboard']);
      },
      (err) => {
        alert('Something went worng');
        this.router.navigate(['./login']);
      }
    );
  }

  /**
   * @description register
   */
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration has been successful');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  isLoggedIn(): boolean {
    // Check if user is logged in (e.g., check for token existence, session, etc.)
    return true; // Replace with actual authentication logic
  }

  /**
   * @description logout
   */
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message)
    });
  }

  /**
   * @description forgot password
   */
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert("Something went worng");
    })
  }
}
