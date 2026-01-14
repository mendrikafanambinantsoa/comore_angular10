import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireMenageComponent } from './questionnaire-menage.component';

describe('QuestionnaireMenageComponent', () => {
  let component: QuestionnaireMenageComponent;
  let fixture: ComponentFixture<QuestionnaireMenageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireMenageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireMenageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
