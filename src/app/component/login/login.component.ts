import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    if (!this.email) {
      alert('Please enter a valid email');
      return;
    }

    this.auth.login(this.email, this.password)
      .then(() => {
        // Handle success if needed
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Login error:', error);
      });

    this.email = '';
    this.password = '';
  }
}
