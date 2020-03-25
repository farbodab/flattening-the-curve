import { TestBed } from '@angular/core/testing';

import { HostService } from './host.service';

describe('HostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HostService = TestBed.get(HostService);
    expect(service).toBeTruthy();
  });
});
