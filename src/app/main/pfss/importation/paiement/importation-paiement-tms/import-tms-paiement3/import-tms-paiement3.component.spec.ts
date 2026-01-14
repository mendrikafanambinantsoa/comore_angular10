import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTmsPaiement3Component } from './import-tms-paiement3.component';

describe('ImportTmsPaiement3Component', () => {
  let component: ImportTmsPaiement3Component;
  let fixture: ComponentFixture<ImportTmsPaiement3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTmsPaiement3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTmsPaiement3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
