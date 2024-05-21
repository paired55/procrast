import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly validUsername = 'Osama';
  private readonly validPassword = 'valuftw';
  private readonly localStorageKey = 'isLoggedIn';

  private _isLoggedIn = false;

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor() {
    const isLoggedIn = localStorage.getItem(this.localStorageKey);
    this._isLoggedIn = isLoggedIn === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this._isLoggedIn = true;
      localStorage.setItem(this.localStorageKey, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this._isLoggedIn = false;
    localStorage.removeItem(this.localStorageKey);
  }
}
