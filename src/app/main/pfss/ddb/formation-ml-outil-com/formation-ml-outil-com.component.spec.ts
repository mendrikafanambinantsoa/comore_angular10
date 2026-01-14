import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationMlOutilComComponent } from './formation-ml-outil-com.component';

describe('FormationMlOutilComComponent', () => {
  let component: FormationMlOutilComComponent;
  let fixture: ComponentFixture<FormationMlOutilComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationMlOutilComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationMlOutilComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
