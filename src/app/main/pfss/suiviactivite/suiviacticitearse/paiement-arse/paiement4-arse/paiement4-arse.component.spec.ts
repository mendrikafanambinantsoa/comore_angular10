import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement4ArseComponent } from './paiement4-arse.component';

describe('Paiement4ArseComponent', () => {
  let component: Paiement4ArseComponent;
  let fixture: ComponentFixture<Paiement4ArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paiement4ArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paiement4ArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
