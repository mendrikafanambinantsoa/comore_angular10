import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeFormationArseComponent } from './theme-formation-arse.component';

describe('ThemeFormationArseComponent', () => {
  let component: ThemeFormationArseComponent;
  let fixture: ComponentFixture<ThemeFormationArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeFormationArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeFormationArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
