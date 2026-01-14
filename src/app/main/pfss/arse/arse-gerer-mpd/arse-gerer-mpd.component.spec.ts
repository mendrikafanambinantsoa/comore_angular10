import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArseGererMpdComponent } from './arse-gerer-mpd.component';

describe('ArseGererMpdComponent', () => {
  let component: ArseGererMpdComponent;
  let fixture: ComponentFixture<ArseGererMpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArseGererMpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArseGererMpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
