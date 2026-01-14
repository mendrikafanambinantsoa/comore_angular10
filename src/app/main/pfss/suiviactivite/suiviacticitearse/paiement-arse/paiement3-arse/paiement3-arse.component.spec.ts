import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement3ArseComponent } from './paiement3-arse.component';

describe('Paiement3ArseComponent', () => {
  let component: Paiement3ArseComponent;
  let fixture: ComponentFixture<Paiement3ArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paiement3ArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paiement3ArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
