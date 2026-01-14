import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheTravailleurComponent } from './fiche-travailleur.component';

describe('FicheTravailleurComponent', () => {
  let component: FicheTravailleurComponent;
  let fixture: ComponentFixture<FicheTravailleurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheTravailleurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheTravailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
