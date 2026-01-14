import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheReceptriceArse1Component } from './fiche-receptrice-arse1.component';

describe('FicheReceptriceArse1Component', () => {
  let component: FicheReceptriceArse1Component;
  let fixture: ComponentFixture<FicheReceptriceArse1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheReceptriceArse1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheReceptriceArse1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
