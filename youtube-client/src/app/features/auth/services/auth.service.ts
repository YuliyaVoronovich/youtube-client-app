import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isLoginnedSubject = new BehaviorSubject(
    this.getAuthStatus()
  );

  public isLoginned$: Observable<boolean> = this.isLoginnedSubject;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  public login(login: string) {
    this.isLoginnedSubject.next(true);
    this.localStorage.setItem('fakeUserToken', login);
  }

  public logout() {
    this.isLoginnedSubject.next(false);
    this.localStorage.removeItem('fakeUserToken');
  }

  private getAuthStatus() {
    return !!this.localStorage.getItem('fakeUserToken');
  }
}
