import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAriepPaiement4Component } from './import-ariep-paiement4.component';

describe('ImportAriepPaiement4Component', () => {
  let component: ImportAriepPaiement4Component;
  let fixture: ComponentFixture<ImportAriepPaiement4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAriepPaiement4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAriepPaiement4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
