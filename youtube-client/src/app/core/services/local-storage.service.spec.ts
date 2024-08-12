import { TestBed } from '@angular/core/testing';

import { LOCAL_STORAGE, LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorageMock: Storage;

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
    service = TestBed.inject(LocalStorageService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an item from local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    jest.spyOn(localStorageMock, 'getItem').mockReturnValue(value);

    const result = service.getItem(key);
    expect(localStorageMock.getItem).toHaveBeenCalledWith(key);
    expect(result).toBe(value);
  });

  it('should set an item in local storage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.setItem(key, value);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should remove an item from local storage', () => {
    const key = 'testKey';

    service.removeItem(key);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(key);
  });

  it('should clear local storage', () => {
    service.clear();
    expect(localStorageMock.clear).toHaveBeenCalled();
  });
});
