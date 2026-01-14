import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePlanRelevementArseComponent } from './fiche-plan-relevement-arse.component';

describe('FichePlanRelevementArseComponent', () => {
  let component: FichePlanRelevementArseComponent;
  let fixture: ComponentFixture<FichePlanRelevementArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichePlanRelevementArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePlanRelevementArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
