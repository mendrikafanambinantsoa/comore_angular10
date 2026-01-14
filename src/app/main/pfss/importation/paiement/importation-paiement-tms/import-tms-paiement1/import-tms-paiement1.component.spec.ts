import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTmsPaiement1Component } from './import-tms-paiement1.component';

describe('ImportTmsPaiement1Component', () => {
  let component: ImportTmsPaiement1Component;
  let fixture: ComponentFixture<ImportTmsPaiement1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTmsPaiement1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTmsPaiement1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
