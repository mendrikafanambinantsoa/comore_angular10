import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPaiementComponent } from './import-etat-paiement.component';

describe('ImportEtatPaiementComponent', () => {
  let component: ImportEtatPaiementComponent;
  let fixture: ComponentFixture<ImportEtatPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
