import { TestBed, inject } from '@angular/core/testing';

import { HgdaPageService } from './hgda-page.service';

describe('HgdaPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HgdaPageService]
    });
  });

  it('should be created', inject([HgdaPageService], (service: HgdaPageService) => {
    expect(service).toBeTruthy();
  }));
});
