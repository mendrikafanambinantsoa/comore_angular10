import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportPlanResilienceComponent } from './import-plan-resilience.component';

describe('ImportPlanResilienceComponent', () => {
  let component: ImportPlanResilienceComponent;
  let fixture: ComponentFixture<ImportPlanResilienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportPlanResilienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPlanResilienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
