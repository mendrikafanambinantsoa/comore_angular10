import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageBeneficiaireArseComponent } from './menage-beneficiaire-arse.component';

describe('MenageBeneficiaireArseComponent', () => {
  let component: MenageBeneficiaireArseComponent;
  let fixture: ComponentFixture<MenageBeneficiaireArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageBeneficiaireArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageBeneficiaireArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
