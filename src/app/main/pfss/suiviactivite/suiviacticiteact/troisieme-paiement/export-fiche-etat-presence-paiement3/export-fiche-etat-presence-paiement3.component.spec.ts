import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFicheEtatPresencePaiement3Component } from './export-fiche-etat-presence-paiement3.component';

describe('ExportFicheEtatPresencePaiement3Component', () => {
  let component: ExportFicheEtatPresencePaiement3Component;
  let fixture: ComponentFixture<ExportFicheEtatPresencePaiement3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFicheEtatPresencePaiement3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFicheEtatPresencePaiement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
