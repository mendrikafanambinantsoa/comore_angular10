import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFicheEtatPaiementPaiement2Component } from './export-fiche-etat-paiement-paiement2.component';

describe('ExportFicheEtatPaiementPaiement2Component', () => {
  let component: ExportFicheEtatPaiementPaiement2Component;
  let fixture: ComponentFixture<ExportFicheEtatPaiementPaiement2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFicheEtatPaiementPaiement2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFicheEtatPaiementPaiement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
