import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaDivaComponent } from './hgda-diva.component';

describe('HgdaDivaComponent', () => {
  let component: HgdaDivaComponent;
  let fixture: ComponentFixture<HgdaDivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaDivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaDivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
