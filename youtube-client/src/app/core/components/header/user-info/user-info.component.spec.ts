import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@features/auth/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let authService: AuthService;
  let router: Router;
  let navigateSpy: unknown;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoComponent],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    navigateSpy = jest
      .spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check login status', () => {
    const changeDetectorRef =
      fixture.debugElement.injector.get(ChangeDetectorRef);

    authService.isLoggedIn.set(true);
    changeDetectorRef.markForCheck();
    fixture.detectChanges();

    expect(component.isLoggedIn()).toBe(true);
  });

  it('should navigate to login page on login', () => {
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(false);
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should logout and navigate to default page', () => {
    jest.spyOn(authService, 'isLoggedIn').mockReturnValue(true);
    jest.spyOn(authService, 'logout').mockImplementation(() => {});
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
