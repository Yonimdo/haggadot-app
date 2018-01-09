import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaIifComponent } from './hgda-iif.component';

describe('HgdaIifComponent', () => {
  let component: HgdaIifComponent;
  let fixture: ComponentFixture<HgdaIifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaIifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaIifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
