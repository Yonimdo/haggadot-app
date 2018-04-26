import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaHomeComponent } from './hgda-home.component';

describe('HgdaHomeComponent', () => {
  let component: HgdaHomeComponent;
  let fixture: ComponentFixture<HgdaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
