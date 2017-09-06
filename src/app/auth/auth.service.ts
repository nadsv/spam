import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private login: boolean = false;

  constructor(private router: Router) {}

  signinUser(user: string, password: string) {
    if (user == 'admin' && password == 'spam') {
      this.login = true;
    }
    this.router.navigate(['/mailing']);
  }

  logout() {
    this.login = false;
  }

  isAuthenticated() {
    return this.login;
  }
} 
