import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteChoisisMenageComponent } from './activite-choisis-menage.component';

describe('ActiviteChoisisMenageComponent', () => {
  let component: ActiviteChoisisMenageComponent;
  let fixture: ComponentFixture<ActiviteChoisisMenageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteChoisisMenageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteChoisisMenageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
