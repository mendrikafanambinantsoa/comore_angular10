import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainteComponent } from './plainte.component';

describe('PlainteComponent', () => {
  let component: PlainteComponent;
  let fixture: ComponentFixture<PlainteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
