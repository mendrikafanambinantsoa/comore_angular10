import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviFichePlanRelevementArseComponent } from './suivi-fiche-plan-relevement-arse.component';

describe('SuiviFichePlanRelevementArseComponent', () => {
  let component: SuiviFichePlanRelevementArseComponent;
  let fixture: ComponentFixture<SuiviFichePlanRelevementArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviFichePlanRelevementArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviFichePlanRelevementArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
