import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererAgepComponent } from './gerer-agep.component';

describe('GererAgepComponent', () => {
  let component: GererAgepComponent;
  let fixture: ComponentFixture<GererAgepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererAgepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererAgepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
