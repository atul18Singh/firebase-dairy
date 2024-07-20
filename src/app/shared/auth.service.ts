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
  ) { }

  /**
   * @description login related logic
   * @param email
   * @param password
   * @returns
   */
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

  /**
   * @description register related logic
   * @param email
   * @param password
   * @returns
   */
  async register(email: string, password: string): Promise<void> {
    try {
      const res = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      alert('Registration successful');
      this.router.navigate(['login']);
      this.sendVerificationEmail(res.user);
      await this.sendVerificationEmail(res.user);
    } catch (error: any) {
      alert('Registration failed: ' + error.message);
      this.router.navigate(['register']);
    }
  }

  /**
   * @description authgard
   * @returns
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * @description logut
   * @returns
   */
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

  /**
   * @description forgot password
   * @param email
   * @returns
   */
  forgotPassword(email: string): Promise<void> {
    return this.fireAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['verify-email']);
      })
      .catch((error) => {
        alert('Forgot password failed: ' + error.message);
      });
  }

  /**
   * @description send email vrification
   * @param user
   * @returns
   */
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
