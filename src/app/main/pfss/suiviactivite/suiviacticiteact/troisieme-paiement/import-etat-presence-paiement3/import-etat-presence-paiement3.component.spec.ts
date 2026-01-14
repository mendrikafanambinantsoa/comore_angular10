import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresencePaiement3Component } from './import-etat-presence-paiement3.component';

describe('ImportEtatPresencePaiement3Component', () => {
  let component: ImportEtatPresencePaiement3Component;
  let fixture: ComponentFixture<ImportEtatPresencePaiement3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresencePaiement3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresencePaiement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
