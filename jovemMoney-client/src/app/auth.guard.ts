import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
const secret = 'fuck-hmac-for-requesting-a-long-password-haha'; // I know that is the good way to store a secret but is just a hack.

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  userID?: number;

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        return false;
      }
      this.userID = payload.sub 
      return true;
    } catch {
      return false;
    }
  }

  login(data: any) {
    const {token} = data;
    if (!token) return;
    const id = this.getId(token)
    console.log(id);
    const payload = JSON.parse(atob(token.split('.')[1]))
    this.userID = payload.sub
    if (token) {
      localStorage.setItem('token', token || '');
      this.router.navigate(['/home'])
    }
  }

  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      window.location.href = '/home';
    }
  }

  getId(tokenP?: any): any | null {
    const token = tokenP ?? localStorage.getItem('token');
    if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || null
    
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  if (authService.isLoggedIn()) {
    return true;
  }
  window.location.href = '/login';
  return false;
};