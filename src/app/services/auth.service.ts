import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn() {
    this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArUOcBNOaEAX9hKd7Sd5dIitawu64if8M',
        {
          email: 'test@test.com',
          password: 'testing',
          returnSecureToken: true,
        }
      )
      .subscribe((res) => console.log(res));
  }
}
