import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajBeneficiaireComponent } from './maj-beneficiaire.component';

describe('MajBeneficiaireComponent', () => {
  let component: MajBeneficiaireComponent;
  let fixture: ComponentFixture<MajBeneficiaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajBeneficiaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
