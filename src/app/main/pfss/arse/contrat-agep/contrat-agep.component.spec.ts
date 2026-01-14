import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratAgepComponent } from './contrat-agep.component';

describe('ContratAgepComponent', () => {
  let component: ContratAgepComponent;
  let fixture: ComponentFixture<ContratAgepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratAgepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratAgepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
