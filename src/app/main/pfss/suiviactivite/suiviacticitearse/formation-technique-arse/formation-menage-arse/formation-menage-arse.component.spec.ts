import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationMenageArseComponent } from './formation-menage-arse.component';

describe('FormationMenageArseComponent', () => {
  let component: FormationMenageArseComponent;
  let fixture: ComponentFixture<FormationMenageArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationMenageArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationMenageArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
