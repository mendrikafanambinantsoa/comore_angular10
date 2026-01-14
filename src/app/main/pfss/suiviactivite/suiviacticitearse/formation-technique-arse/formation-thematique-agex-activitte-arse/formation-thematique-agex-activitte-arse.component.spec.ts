import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationThematiqueAgexActivitteArseComponent } from './formation-thematique-agex-activitte-arse.component';

describe('FormationThematiqueAgexActivitteArseComponent', () => {
  let component: FormationThematiqueAgexActivitteArseComponent;
  let fixture: ComponentFixture<FormationThematiqueAgexActivitteArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationThematiqueAgexActivitteArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationThematiqueAgexActivitteArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
