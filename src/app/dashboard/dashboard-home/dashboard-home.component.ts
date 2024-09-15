import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/services/movie.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  users: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // Using async/await for better readability
  async getUsers() {
    try {
      const response = await this.userService.getUsers().toPromise();
      this.users = response; // Adjust based on actual API response structure
      console.log(this.users);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  logOut() {
    this.authService.logout();
  }

  contact() {
    this.router.navigate(['dashboard/contact']);
  }
}
