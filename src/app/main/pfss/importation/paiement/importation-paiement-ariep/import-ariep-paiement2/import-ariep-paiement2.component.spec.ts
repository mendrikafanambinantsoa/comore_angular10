import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAriepPaiement2Component } from './import-ariep-paiement2.component';

describe('ImportAriepPaiement2Component', () => {
  let component: ImportAriepPaiement2Component;
  let fixture: ComponentFixture<ImportAriepPaiement2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAriepPaiement2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAriepPaiement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
