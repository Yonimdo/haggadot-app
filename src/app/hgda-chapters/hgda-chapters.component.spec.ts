import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HgdaChaptersComponent} from './hgda-chapters.component';

describe('HgdaChaptersComponent', () => {
  let component: HgdaChaptersComponent;
  let fixture: ComponentFixture<HgdaChaptersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HgdaChaptersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
