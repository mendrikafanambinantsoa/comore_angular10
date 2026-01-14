import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageInscritActComponent } from './menage-inscrit-act.component';

describe('MenageInscritActComponent', () => {
  let component: MenageInscritActComponent;
  let fixture: ComponentFixture<MenageInscritActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageInscritActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageInscritActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
