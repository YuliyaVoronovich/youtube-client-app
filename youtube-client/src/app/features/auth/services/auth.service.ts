import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isLoginnedSubject = new BehaviorSubject(
    this.getAuthStatus()
  );

  public isLoginned(): boolean {
    return this.isLoginnedSubject.value;
  }

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  public login(login: string) {
    this.isLoginnedSubject.next(true);
    this.localStorage.setItem('fakeUserToken', login);
  }

  public logout() {
    this.localStorage.removeItem('fakeUserToken');
    this.isLoginnedSubject.next(false);
  }

  private getAuthStatus() {
    return !!this.localStorage.getItem('fakeUserToken');
  }
}
