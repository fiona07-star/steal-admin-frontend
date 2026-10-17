import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { quanTriGuard } from './quan-tri-guard';

describe('quanTriGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => quanTriGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
