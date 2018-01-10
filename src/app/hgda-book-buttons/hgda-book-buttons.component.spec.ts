import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaBookButtonsComponent } from './hgda-book-buttons.component';

describe('HgdaBookButtonsComponent', () => {
  let component: HgdaBookButtonsComponent;
  let fixture: ComponentFixture<HgdaBookButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaBookButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaBookButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
