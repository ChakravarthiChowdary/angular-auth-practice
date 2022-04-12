import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanDeactivate<null> {
  constructor(public authSerivce: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.authSerivce.authenticated) {
      this.router.navigate(['/authsignin']);
      return false;
    }
    return true;
  }

  canDeactivate(): boolean {
    if (this.authSerivce.authenticated) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
