import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fichereceptrice2TmsComponent } from './fichereceptrice2-tms.component';

describe('Fichereceptrice2TmsComponent', () => {
  let component: Fichereceptrice2TmsComponent;
  let fixture: ComponentFixture<Fichereceptrice2TmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fichereceptrice2TmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fichereceptrice2TmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
