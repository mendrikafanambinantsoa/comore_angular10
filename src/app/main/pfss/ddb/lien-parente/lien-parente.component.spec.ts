import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LienParenteComponent } from './lien-parente.component';

describe('LienParenteComponent', () => {
  let component: LienParenteComponent;
  let fixture: ComponentFixture<LienParenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LienParenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LienParenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
