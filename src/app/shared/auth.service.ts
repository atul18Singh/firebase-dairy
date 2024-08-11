import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) { }

  /**
   * @description login related logic
   * @param emailAddress
   * @param passwordCredential
   */
  async login(emailAddress: string, passwordCredential: string): Promise<void> {
    try {
      console.log('Attempting to sign in');
      await this.fireAuth.signInWithEmailAndPassword(emailAddress, passwordCredential);
      console.log('Sign in successful');
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Login failed:', error.message);
      }
      this.router.navigate(['login']);
    }
  }

  /**
   * @description register related logic
   * @param emailAddress
   * @param passwordCredential
   */
  async register(emailAddress: string, passwordCredential: string): Promise<void> {
    try {
      const res = await this.fireAuth.createUserWithEmailAndPassword(emailAddress, passwordCredential);
      alert('Registration successful');
      this.router.navigate(['login']);
      await this.sendEmailVerificationLink(res.user);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Registration failed:', error.message);
      }
      this.router.navigate(['register']);
    }
  }

  /**
   * @description auth guard
   * @returns
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  /**
   * @description logout
   * @returns
   */
  logout(): Promise<void> {
    return this.fireAuth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      })
      .catch((error: Error) => {
        alert('Logout failed: ' + error.message);
      });
  }

  /**
   * @description forgot password
   * @param emailAddress
   * @returns
   */
  forgotPassword(emailAddress: string): Promise<void> {
    return this.fireAuth.sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.router.navigate(['verify-email']);
      })
      .catch((error: Error) => {
        alert('Forgot password failed: ' + error.message);
      });
  }

  /**
   * @description send email verification link
   * @param user
   * @returns
   */
  private async sendEmailVerificationLink(user: any): Promise<void> {
    try {
      await user.sendEmailVerification();
      this.router.navigate(['verify-email']);
    } catch (error: any) {
      alert('Failed to send verification email: ' + error.message);
    }
  }
}
