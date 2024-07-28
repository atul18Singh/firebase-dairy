import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  movies: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      (data) => {
        this.movies = data.results; // Adjust based on actual API response structure
      },
      (error) => {
        console.error('Error fetching movies', error);
      }
    );
  }

  logOut() {
    this.authService.logout();
  }

  contact() {
    this.router.navigate(['dashboard/contact']);
  }
}
