import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationPaiementActrCycle2DeuxiemePaiementComponent } from './importation-paiement-actr-cycle2-deuxieme-paiement.component';

describe('ImportationPaiementActrCycle2DeuxiemePaiementComponent', () => {
  let component: ImportationPaiementActrCycle2DeuxiemePaiementComponent;
  let fixture: ComponentFixture<ImportationPaiementActrCycle2DeuxiemePaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportationPaiementActrCycle2DeuxiemePaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportationPaiementActrCycle2DeuxiemePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
