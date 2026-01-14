import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireMereLeaderArseComponent } from './questionnaire-mere-leader-arse.component';

describe('QuestionnaireMereLeaderArseComponent', () => {
  let component: QuestionnaireMereLeaderArseComponent;
  let fixture: ComponentFixture<QuestionnaireMereLeaderArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireMereLeaderArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireMereLeaderArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
