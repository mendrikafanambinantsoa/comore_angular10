import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationThematiqueSuiviAgexActiviteArseComponent } from './formation-thematique-suivi-agex-activite-arse.component';

describe('FormationThematiqueSuiviAgexActiviteArseComponent', () => {
  let component: FormationThematiqueSuiviAgexActiviteArseComponent;
  let fixture: ComponentFixture<FormationThematiqueSuiviAgexActiviteArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationThematiqueSuiviAgexActiviteArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationThematiqueSuiviAgexActiviteArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
