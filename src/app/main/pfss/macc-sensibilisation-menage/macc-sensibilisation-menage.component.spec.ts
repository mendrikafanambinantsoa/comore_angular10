import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaccSensibilisationMenageComponent } from './macc-sensibilisation-menage.component';

describe('MaccSensibilisationMenageComponent', () => {
  let component: MaccSensibilisationMenageComponent;
  let fixture: ComponentFixture<MaccSensibilisationMenageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaccSensibilisationMenageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaccSensibilisationMenageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
