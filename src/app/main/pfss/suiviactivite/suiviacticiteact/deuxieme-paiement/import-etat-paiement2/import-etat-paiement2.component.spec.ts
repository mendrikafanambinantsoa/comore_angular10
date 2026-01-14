import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPaiement2Component } from './import-etat-paiement2.component';

describe('ImportEtatPaiement2Component', () => {
  let component: ImportEtatPaiement2Component;
  let fixture: ComponentFixture<ImportEtatPaiement2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPaiement2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPaiement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
