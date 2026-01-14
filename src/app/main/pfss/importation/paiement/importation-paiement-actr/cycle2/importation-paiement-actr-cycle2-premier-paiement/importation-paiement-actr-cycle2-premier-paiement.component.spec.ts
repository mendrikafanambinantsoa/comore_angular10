import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationPaiementActrCycle2PremierPaiementComponent } from './importation-paiement-actr-cycle2-premier-paiement.component';

describe('ImportationPaiementActrCycle2PremierPaiementComponent', () => {
  let component: ImportationPaiementActrCycle2PremierPaiementComponent;
  let fixture: ComponentFixture<ImportationPaiementActrCycle2PremierPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportationPaiementActrCycle2PremierPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportationPaiementActrCycle2PremierPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
