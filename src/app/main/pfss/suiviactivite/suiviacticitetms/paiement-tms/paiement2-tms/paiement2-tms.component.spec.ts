import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement2TmsComponent } from './paiement2-tms.component';

describe('Paiement2TmsComponent', () => {
  let component: Paiement2TmsComponent;
  let fixture: ComponentFixture<Paiement2TmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paiement2TmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paiement2TmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
