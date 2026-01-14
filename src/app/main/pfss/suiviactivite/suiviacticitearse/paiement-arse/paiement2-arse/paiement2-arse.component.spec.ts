import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Paiement2ArseComponent } from './paiement2-arse.component';

describe('Paiement2ArseComponent', () => {
  let component: Paiement2ArseComponent;
  let fixture: ComponentFixture<Paiement2ArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Paiement2ArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Paiement2ArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
