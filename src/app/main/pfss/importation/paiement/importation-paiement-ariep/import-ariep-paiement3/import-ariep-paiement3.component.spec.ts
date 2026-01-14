import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAriepPaiement3Component } from './import-ariep-paiement3.component';

describe('ImportAriepPaiement3Component', () => {
  let component: ImportAriepPaiement3Component;
  let fixture: ComponentFixture<ImportAriepPaiement3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAriepPaiement3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAriepPaiement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
