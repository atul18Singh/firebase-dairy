import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router) { }

  // login

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      console.log(localStorage.getItem('token'))
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
    this.fireauth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      alert('Registration has been successful');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user)
    },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  /**
   *
   * @returns auth gard
   */
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false
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

  sendEmailForVarification(user: any) {
    user.sendEmailForVarification().then((res: any) => {
      this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert('Not able you send you register email address')
    })
  }
}
