import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AuthError, User } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  error = new Subject<AuthError | null>();
  user = new Subject<User | null>();
  authenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  logIn(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArUOcBNOaEAX9hKd7Sd5dIitawu64if8M',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  logOut() {
    this.user.next(null);
    this.error.next(null);
    localStorage.removeItem('user');
  }

  autoLogIn() {
    const storedUser = localStorage.getItem('user');
    const storedExpiryDate = localStorage.getItem('expiresIn');

    if (storedUser && storedExpiryDate) {
      const user: User = JSON.parse(storedUser);
      const currentDate = new Date();
      if (currentDate < new Date(storedExpiryDate)) {
        this.user.next(user);
        this.error.next(null);
        console.log(this);
        this.router.navigate(['/home']);
      } else {
        this.logOut();
        this.router.navigate(['/authsignin']);
      }
    }
  }
}
