import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaccAriepLivrableOngEncadrementComponent } from './macc-ariep-livrable-ong-encadrement.component';

describe('MaccAriepLivrableOngEncadrementComponent', () => {
  let component: MaccAriepLivrableOngEncadrementComponent;
  let fixture: ComponentFixture<MaccAriepLivrableOngEncadrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaccAriepLivrableOngEncadrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaccAriepLivrableOngEncadrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
