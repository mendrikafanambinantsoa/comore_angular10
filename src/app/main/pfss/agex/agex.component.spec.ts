import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgexComponent } from './agex.component';

describe('AgexComponent', () => {
  let component: AgexComponent;
  let fixture: ComponentFixture<AgexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
