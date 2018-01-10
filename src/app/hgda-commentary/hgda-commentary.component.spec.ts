import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaCommentaryComponent } from './hgda-commentary.component';

describe('HgdaCommentaryComponent', () => {
  let component: HgdaCommentaryComponent;
  let fixture: ComponentFixture<HgdaCommentaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaCommentaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaCommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
