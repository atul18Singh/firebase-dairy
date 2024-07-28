import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/account/null/lists?page=1';
  private apiKey = 'YOUR_API_KEY';  // Replace with your actual API key

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    const headers = new HttpHeaders({
      'accept': 'application/json'
    });

    const urlWithKey = `${this.apiUrl}&api_key=${this.apiKey}`;

    return this.http.get(urlWithKey, { headers });
  }
}
