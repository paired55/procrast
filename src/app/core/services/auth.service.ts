import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Hardcoded user credientals as per assignment requirements
  private readonly validUsername = 'Osama';
  private readonly validPassword = 'valuftw';
  private readonly localStorageKey = 'isLoggedIn';

  private _isLoggedIn = false;

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  // Checking localStorage first to see if the user is already logged in
  constructor() {
    const isLoggedIn = localStorage.getItem(this.localStorageKey);
    this._isLoggedIn = isLoggedIn === 'true';
  }

  // Saving the user credientals to localStorage to persist between sessions
  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this._isLoggedIn = true;
      localStorage.setItem(this.localStorageKey, 'true');
      return true;
    }
    return false;
  }

  // Setting login status to false and removing the token from localStorage if the user clicks on the Logout button
  logout(): void {
    this._isLoggedIn = false;
    localStorage.removeItem(this.localStorageKey);
  }
}
