import { TestBed } from '@angular/core/testing';

import { NafsService } from './nafs.service';

describe('NafsService', () => {
  let service: NafsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NafsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
