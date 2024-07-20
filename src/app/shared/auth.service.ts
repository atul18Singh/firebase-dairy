import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {}

  login(email: string, password: string): Promise<void> {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('token', 'true');
        console.log(localStorage.getItem('token'));
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        alert('Login failed: ' + error.message);
        this.router.navigate(['login']);
      });
  }

  register(email: string, password: string): Promise<void> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        alert('Registration successful');
        this.router.navigate(['login']);
        this.sendVerificationEmail(res.user);
      })
      .catch((error) => {
        alert('Registration failed: ' + error.message);
        this.router.navigate(['register']);
      });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): Promise<void> {
    return this.fireAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      })
      .catch((error) => {
        alert('Logout failed: ' + error.message);
      });
  }

  forgotPassword(email: string): Promise<void> {
    return this.fireAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['verify-email']);
      })
      .catch((error) => {
        alert('Forgot password failed: ' + error.message);
      });
  }

  private sendVerificationEmail(user: any): Promise<void> {
    return user.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
      .catch((error: any) => {
        alert('Failed to send verification email: ' + error.message);
      });
  }
}
