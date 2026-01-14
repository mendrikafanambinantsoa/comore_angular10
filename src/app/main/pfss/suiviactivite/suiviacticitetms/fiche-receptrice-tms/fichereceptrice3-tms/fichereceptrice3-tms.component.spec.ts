import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fichereceptrice3TmsComponent } from './fichereceptrice3-tms.component';

describe('Fichereceptrice3TmsComponent', () => {
  let component: Fichereceptrice3TmsComponent;
  let fixture: ComponentFixture<Fichereceptrice3TmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fichereceptrice3TmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fichereceptrice3TmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
