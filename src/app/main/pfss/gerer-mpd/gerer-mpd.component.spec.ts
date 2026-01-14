import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererMpdComponent } from './gerer-mpd.component';

describe('GererMpdComponent', () => {
  let component: GererMpdComponent;
  let fixture: ComponentFixture<GererMpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererMpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererMpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
