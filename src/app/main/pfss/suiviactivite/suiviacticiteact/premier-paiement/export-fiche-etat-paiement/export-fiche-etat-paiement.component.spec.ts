import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFicheEtatPaiementComponent } from './export-fiche-etat-paiement.component';

describe('ExportFicheEtatPaiementComponent', () => {
  let component: ExportFicheEtatPaiementComponent;
  let fixture: ComponentFixture<ExportFicheEtatPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFicheEtatPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFicheEtatPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
