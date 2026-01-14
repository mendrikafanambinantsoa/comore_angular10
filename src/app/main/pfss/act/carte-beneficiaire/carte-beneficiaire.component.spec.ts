import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteBeneficiaireComponent } from './carte-beneficiaire.component';

describe('CarteBeneficiaireComponent', () => {
  let component: CarteBeneficiaireComponent;
  let fixture: ComponentFixture<CarteBeneficiaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteBeneficiaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
