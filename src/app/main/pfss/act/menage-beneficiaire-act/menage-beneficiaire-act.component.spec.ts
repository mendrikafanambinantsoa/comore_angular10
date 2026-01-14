import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageBeneficiaireActComponent } from './menage-beneficiaire-act.component';

describe('MenageBeneficiaireActComponent', () => {
  let component: MenageBeneficiaireActComponent;
  let fixture: ComponentFixture<MenageBeneficiaireActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageBeneficiaireActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageBeneficiaireActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
