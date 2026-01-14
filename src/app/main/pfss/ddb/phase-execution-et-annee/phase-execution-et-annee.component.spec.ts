import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseExecutionEtAnneeComponent } from './phase-execution-et-annee.component';

describe('PhaseExecutionEtAnneeComponent', () => {
  let component: PhaseExecutionEtAnneeComponent;
  let fixture: ComponentFixture<PhaseExecutionEtAnneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseExecutionEtAnneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseExecutionEtAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
