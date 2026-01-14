import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement1ArseComponent } from './paiement1-arse.component';

describe('Paiement1ArseComponent', () => {
  let component: Paiement1ArseComponent;
  let fixture: ComponentFixture<Paiement1ArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paiement1ArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paiement1ArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
