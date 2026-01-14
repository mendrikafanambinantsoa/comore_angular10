import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireIndividuComponent } from './questionnaire-individu.component';

describe('QuestionnaireIndividuComponent', () => {
  let component: QuestionnaireIndividuComponent;
  let fixture: ComponentFixture<QuestionnaireIndividuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireIndividuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireIndividuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
