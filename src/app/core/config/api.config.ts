import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private token = 'YOUR_API_TOKEN_HERE'; // Replace with your actual API token

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }

  getData(endpoint: string): any {
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  getUsers(): any {
    return this.getData('users');
  }

  getMovie(): any {
    return this.getData('movies'); // assuming the endpoint is 'movies'
  }

  getSongs(): any {
    return this.getData('songs'); // assuming the endpoint is 'songs'
  }
}
