import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@features/auth/services/auth.service';
import { CUSTOM_ERRORS } from '@shared/tokens/custom-error.token';
import { errors } from '@shared/constants/built-in-errors.constant';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthService;
  let router: Router;
  let navigateSpy: unknown;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, ReactiveFormsModule],
      providers: [
        provideRouter([]),
        provideAnimations(),
        AuthService,
        Router,
        {
          provide: CUSTOM_ERRORS,
          useValue: errors,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();

    navigateSpy = jest
      .spyOn(router, 'navigate')
      .mockImplementation(() => Promise.resolve(true));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user with valid form', () => {
    jest.spyOn(authService, 'login').mockImplementation(() => {});

    component.loginForm.setValue({
      username: 'test@example.com',
      password: 'Qwerty1!',
    });
    expect(component.loginForm.valid).toBeTruthy();

    component.login();

    expect(authService.login).toHaveBeenCalledWith('test@example.com');
    expect(navigateSpy).toHaveBeenCalledWith(['/main']);
  });

  it('should not login user with invalid form', () => {
    jest.spyOn(authService, 'login').mockImplementation(() => {});

    component.loginForm.setValue({
      username: 'test',
      password: 'test',
    });
    expect(component.loginForm.valid).toBeFalsy();

    component.login();

    expect(authService.login).toHaveBeenCalledTimes(0);
    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });
});
