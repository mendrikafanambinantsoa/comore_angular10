import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActGererMpdComponent } from './act-gerer-mpd.component';

describe('ActGererMpdComponent', () => {
  let component: ActGererMpdComponent;
  let fixture: ComponentFixture<ActGererMpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActGererMpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActGererMpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
