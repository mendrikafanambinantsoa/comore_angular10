import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgexAgepCpsComponent } from './agex-agep-cps.component';

describe('AgexAgepCpsComponent', () => {
  let component: AgexAgepCpsComponent;
  let fixture: ComponentFixture<AgexAgepCpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgexAgepCpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgexAgepCpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
