import { Injectable } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

const KEY_USER_TOKEN = 'fakeUserToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isLoginned$$ = new BehaviorSubject(this.getAuthStatus());

  public isLoginned$ = this.isLoginned$$.pipe();

  constructor(private localStorage: LocalStorageService) {}

  public isLoginned(): boolean {
    return this.isLoginned$$.value;
  }

  public login(login: string) {
    this.isLoginned$$.next(true);
    this.localStorage.setItem(KEY_USER_TOKEN, login);
  }

  public logout() {
    this.localStorage.removeItem(KEY_USER_TOKEN);
    this.isLoginned$$.next(false);
  }

  private getAuthStatus() {
    return !!this.localStorage.getItem(KEY_USER_TOKEN);
  }
}
