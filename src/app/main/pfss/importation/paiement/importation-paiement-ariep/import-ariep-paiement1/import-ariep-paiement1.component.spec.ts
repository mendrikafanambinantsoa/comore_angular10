import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAriepPaiement1Component } from './import-ariep-paiement1.component';

describe('ImportAriepPaiement1Component', () => {
  let component: ImportAriepPaiement1Component;
  let fixture: ComponentFixture<ImportAriepPaiement1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAriepPaiement1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAriepPaiement1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
