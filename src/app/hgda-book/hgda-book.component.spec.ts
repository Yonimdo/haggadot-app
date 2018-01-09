import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaBookComponent } from './hgda-book.component';

describe('HgdaBookComponent', () => {
  let component: HgdaBookComponent;
  let fixture: ComponentFixture<HgdaBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
