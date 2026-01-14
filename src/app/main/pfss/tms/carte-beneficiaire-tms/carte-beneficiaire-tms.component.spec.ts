import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteBeneficiaireTmsComponent } from './carte-beneficiaire-tms.component';

describe('CarteBeneficiaireTmsComponent', () => {
  let component: CarteBeneficiaireTmsComponent;
  let fixture: ComponentFixture<CarteBeneficiaireTmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteBeneficiaireTmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteBeneficiaireTmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
