import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement1TmsComponent } from './paiement1-tms.component';

describe('Paiement1TmsComponent', () => {
  let component: Paiement1TmsComponent;
  let fixture: ComponentFixture<Paiement1TmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paiement1TmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paiement1TmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
