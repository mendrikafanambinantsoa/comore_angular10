import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFicheEtatPresencePaiement2Component } from './export-fiche-etat-presence-paiement2.component';

describe('ExportFicheEtatPresencePaiement2Component', () => {
  let component: ExportFicheEtatPresencePaiement2Component;
  let fixture: ComponentFixture<ExportFicheEtatPresencePaiement2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFicheEtatPresencePaiement2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFicheEtatPresencePaiement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
