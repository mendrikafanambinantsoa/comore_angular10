import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanActionReinstallationComponent } from './plan-action-reinstallation.component';

describe('PlanActionReinstallationComponent', () => {
  let component: PlanActionReinstallationComponent;
  let fixture: ComponentFixture<PlanActionReinstallationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanActionReinstallationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanActionReinstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
