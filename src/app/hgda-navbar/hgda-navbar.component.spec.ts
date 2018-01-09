import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaNavbarComponent } from './hgda-navbar.component';

describe('HgdaNavbarComponent', () => {
  let component: HgdaNavbarComponent;
  let fixture: ComponentFixture<HgdaNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
