import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  users: any[] = [];
  exclusive: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: MovieService
  ) { }

  ngOnInit(): void {
    this.userService.exclusive.subscribe((res: any) => {
      this.exclusive = res
    })
  }

  // Using async/await for better readability
  async getUsers() {
    try {
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

  goToDashboard() {
    this.router.navigate(['dashboard'])
  }
}
