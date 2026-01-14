import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTmsPaiement2Component } from './import-tms-paiement2.component';

describe('ImportTmsPaiement2Component', () => {
  let component: ImportTmsPaiement2Component;
  let fixture: ComponentFixture<ImportTmsPaiement2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTmsPaiement2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTmsPaiement2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
