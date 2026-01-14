import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement3TmsComponent } from './paiement3-tms.component';

describe('Paiement3TmsComponent', () => {
  let component: Paiement3TmsComponent;
  let fixture: ComponentFixture<Paiement3TmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paiement3TmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paiement3TmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
