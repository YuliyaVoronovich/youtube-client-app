import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';

const KEY_USER_TOKEN = 'fakeUserToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = signal(this.getAuthStatus());

  constructor(private localStorage: LocalStorageService) {}

  public isLoginned(): boolean {
    return this.isLoggedIn();
  }

  public login(login: string) {
    this.isLoggedIn.set(true);
    this.localStorage.setItem(KEY_USER_TOKEN, login);
  }

  public logout() {
    this.localStorage.removeItem(KEY_USER_TOKEN);
    this.isLoggedIn.set(false);
  }

  private getAuthStatus() {
    return !!this.localStorage.getItem(KEY_USER_TOKEN);
  }
}
