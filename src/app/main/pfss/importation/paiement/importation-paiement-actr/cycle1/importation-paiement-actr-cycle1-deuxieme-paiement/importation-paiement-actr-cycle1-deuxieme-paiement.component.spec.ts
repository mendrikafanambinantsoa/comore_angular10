import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationPaiementActrCycle1DeuxiemePaiementComponent } from './importation-paiement-actr-cycle1-deuxieme-paiement.component';

describe('ImportationPaiementActrCycle1DeuxiemePaiementComponent', () => {
  let component: ImportationPaiementActrCycle1DeuxiemePaiementComponent;
  let fixture: ComponentFixture<ImportationPaiementActrCycle1DeuxiemePaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportationPaiementActrCycle1DeuxiemePaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportationPaiementActrCycle1DeuxiemePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
