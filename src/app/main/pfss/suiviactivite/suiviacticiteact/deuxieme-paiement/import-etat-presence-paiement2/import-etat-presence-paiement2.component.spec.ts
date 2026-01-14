import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresencePaiement2Component } from './import-etat-presence-paiement2.component';

describe('ImportEtatPresencePaiement2Component', () => {
  let component: ImportEtatPresencePaiement2Component;
  let fixture: ComponentFixture<ImportEtatPresencePaiement2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresencePaiement2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresencePaiement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
