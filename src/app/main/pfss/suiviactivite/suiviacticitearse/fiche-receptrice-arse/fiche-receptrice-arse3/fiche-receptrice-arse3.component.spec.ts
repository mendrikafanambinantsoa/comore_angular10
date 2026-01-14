import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheReceptriceArse3Component } from './fiche-receptrice-arse3.component';

describe('FicheReceptriceArse3Component', () => {
  let component: FicheReceptriceArse3Component;
  let fixture: ComponentFixture<FicheReceptriceArse3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheReceptriceArse3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheReceptriceArse3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
