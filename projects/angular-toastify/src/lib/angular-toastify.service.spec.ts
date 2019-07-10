import { TestBed } from '@angular/core/testing';

import { AngularToastifyService } from './angular-toastify.service';

describe('AngularToastifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularToastifyService = TestBed.get(AngularToastifyService);
    expect(service).toBeTruthy();
  });
});
