import { TestBed } from '@angular/core/testing';
import { TroChoiAdmin } from './tro-choi-admin';

describe('TroChoiAdmin', () => {
  let service: TroChoiAdmin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TroChoiAdmin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
