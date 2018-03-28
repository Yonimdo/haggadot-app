import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaInfoDialogComponent } from './hgda-info-dialog.component';

describe('HgdaInfoDialogComponent', () => {
  let component: HgdaInfoDialogComponent;
  let fixture: ComponentFixture<HgdaInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
