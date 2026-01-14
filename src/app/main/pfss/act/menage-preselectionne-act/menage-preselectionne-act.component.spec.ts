import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagePreselectionneActComponent } from './menage-preselectionne-act.component';

describe('MenagePreselectionneActComponent', () => {
  let component: MenagePreselectionneActComponent;
  let fixture: ComponentFixture<MenagePreselectionneActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenagePreselectionneActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenagePreselectionneActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
