import { Component } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  users: any;
  constructor(private UsersService: UsersService) {}

  ngOnInit(): void {
   this.UsersService.getUsers().subscribe((user: any) =>{
      this.users = user
   })

   this.UsersService.getStudents().subscribe((student : any) =>{
    this.users = student
   })
  }
}
