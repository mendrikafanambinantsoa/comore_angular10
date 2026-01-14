import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererPacComponent } from './gerer-pac.component';

describe('GererPacComponent', () => {
  let component: GererPacComponent;
  let fixture: ComponentFixture<GererPacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererPacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
