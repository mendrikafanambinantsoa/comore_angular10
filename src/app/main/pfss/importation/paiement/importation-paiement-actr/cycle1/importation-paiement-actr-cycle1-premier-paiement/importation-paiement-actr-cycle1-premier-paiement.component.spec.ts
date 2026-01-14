import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationPaiementActrCycle1PremierPaiementComponent } from './importation-paiement-actr-cycle1-premier-paiement.component';

describe('ImportationPaiementActrCycle1PremierPaiementComponent', () => {
  let component: ImportationPaiementActrCycle1PremierPaiementComponent;
  let fixture: ComponentFixture<ImportationPaiementActrCycle1PremierPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportationPaiementActrCycle1PremierPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportationPaiementActrCycle1PremierPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
