import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheReceptriceArse4Component } from './fiche-receptrice-arse4.component';

describe('FicheReceptriceArse4Component', () => {
  let component: FicheReceptriceArse4Component;
  let fixture: ComponentFixture<FicheReceptriceArse4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheReceptriceArse4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheReceptriceArse4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
