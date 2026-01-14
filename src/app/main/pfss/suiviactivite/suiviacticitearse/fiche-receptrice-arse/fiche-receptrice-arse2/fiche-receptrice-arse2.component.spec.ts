import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheReceptriceArse2Component } from './fiche-receptrice-arse2.component';

describe('FicheReceptriceArse2Component', () => {
  let component: FicheReceptriceArse2Component;
  let fixture: ComponentFixture<FicheReceptriceArse2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheReceptriceArse2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheReceptriceArse2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
