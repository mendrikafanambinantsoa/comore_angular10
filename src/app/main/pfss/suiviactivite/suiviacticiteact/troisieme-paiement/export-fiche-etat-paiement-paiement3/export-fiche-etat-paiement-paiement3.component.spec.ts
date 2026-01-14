import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFicheEtatPaiementPaiement3Component } from './export-fiche-etat-paiement-paiement3.component';

describe('ExportFicheEtatPaiementPaiement3Component', () => {
  let component: ExportFicheEtatPaiementPaiement3Component;
  let fixture: ComponentFixture<ExportFicheEtatPaiementPaiement3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFicheEtatPaiementPaiement3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFicheEtatPaiementPaiement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
