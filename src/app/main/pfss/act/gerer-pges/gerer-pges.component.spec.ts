import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererPgesComponent } from './gerer-pges.component';

describe('GererPgesComponent', () => {
  let component: GererPgesComponent;
  let fixture: ComponentFixture<GererPgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererPgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererPgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
