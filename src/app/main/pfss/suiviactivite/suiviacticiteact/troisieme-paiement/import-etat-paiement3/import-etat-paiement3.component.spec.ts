import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPaiement3Component } from './import-etat-paiement3.component';

describe('ImportEtatPaiement3Component', () => {
  let component: ImportEtatPaiement3Component;
  let fixture: ComponentFixture<ImportEtatPaiement3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPaiement3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPaiement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
