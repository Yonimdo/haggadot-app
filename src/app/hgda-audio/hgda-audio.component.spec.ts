import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HgdaAudioComponent } from './hgda-audio.component';

describe('HgdaAudioComponent', () => {
  let component: HgdaAudioComponent;
  let fixture: ComponentFixture<HgdaAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HgdaAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HgdaAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
