import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthError, User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  user: User | null = null;
  error: AuthError | null = null;
  userSubscription: Subscription | null = null;
  errorSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.logIn(form.value.email, form.value.password).subscribe({
        next: (res: any) => {
          this.onSuccessLogin(res, form);
        },
        error: (err) => {
          this.onLoginError(err);
        },
      });
    }
  }

  getErrorMessage(msg: string) {
    if (msg === 'EMAIL_NOT_FOUND' || msg === 'INVALID_PASSWORD') {
      return 'Invalid username or password.';
    } else if (msg === 'USER_DISABLED') {
      return 'User disabled by administrator.';
    } else if (
      msg ===
      'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
    ) {
      return 'Too many invalid attempts !';
    } else {
      return 'Unknown error occurred. Will fix soon !';
    }
  }

  onSuccessLogin(user: User, form: NgForm) {
    this.user = user;
    this.error = null;
    form.reset();
    this.authService.authenticated = true;
    this.authService.user.next(user);
    this.authService.error.next(null);
    this.router.navigate(['/home']);
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem(
      'expiresIn',
      new Date(new Date().getTime() + 3600 * 1000).toString()
    );
  }

  onLoginError(err: any) {
    this.user = null;
    this.error = err.error;
    this.authService.authenticated = false;
    this.authService.user.next(null);
    this.authService.error.next(err.error);
    localStorage.removeItem('user');
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }
}
