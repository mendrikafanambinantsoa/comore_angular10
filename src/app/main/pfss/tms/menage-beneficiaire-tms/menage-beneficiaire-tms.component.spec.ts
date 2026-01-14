import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageBeneficiaireTmsComponent } from './menage-beneficiaire-tms.component';

describe('MenageBeneficiaireTmsComponent', () => {
  let component: MenageBeneficiaireTmsComponent;
  let fixture: ComponentFixture<MenageBeneficiaireTmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageBeneficiaireTmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageBeneficiaireTmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
