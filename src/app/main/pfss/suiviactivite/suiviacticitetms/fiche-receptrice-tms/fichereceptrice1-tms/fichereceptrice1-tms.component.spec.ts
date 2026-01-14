import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fichereceptrice1TmsComponent } from './fichereceptrice1-tms.component';

describe('Fichereceptrice1TmsComponent', () => {
  let component: Fichereceptrice1TmsComponent;
  let fixture: ComponentFixture<Fichereceptrice1TmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fichereceptrice1TmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fichereceptrice1TmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
