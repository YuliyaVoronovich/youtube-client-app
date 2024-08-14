import { TestBed } from '@angular/core/testing';

import {
  LOCAL_STORAGE,
  LocalStorageService,
} from '@core/services/local-storage.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageMock: Storage;
  const fakeUserToken = 'testUserToken';

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    } as unknown as Storage;

    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        { provide: LOCAL_STORAGE, useValue: localStorageMock },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false for isLoginned when not logged in', () => {
    jest.spyOn(localStorageMock, 'getItem').mockReturnValue(null);
    service.logout();
    expect(service.isLoginned()).toBe(false);
  });

  it('should return true for isLoginned when logged in', () => {
    jest.spyOn(localStorageMock, 'getItem').mockReturnValue(fakeUserToken);
    service.login(fakeUserToken);
    expect(service.isLoginned()).toBe(true);
  });

  it('should set login status and store token on login', () => {
    service.login(fakeUserToken);

    expect(service.isLoginned()).toBeTruthy();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'fakeUserToken',
      fakeUserToken
    );
  });

  it('should clear login status and remove token on logout', () => {
    service.login(fakeUserToken);
    service.logout();

    expect(service.isLoginned()).toBeFalsy();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('fakeUserToken');
  });
});
