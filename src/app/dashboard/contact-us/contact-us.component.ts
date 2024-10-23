import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: MovieService
  ) { }

  ngOnInit(): void {
    this.userService.exclusive.next(true)
    console.log(this.userService.exclusive.next(true))
  }


}
