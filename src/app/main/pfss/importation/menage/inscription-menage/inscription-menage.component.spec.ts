import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionMenageComponent } from './inscription-menage.component';

describe('InscriptionMenageComponent', () => {
  let component: InscriptionMenageComponent;
  let fixture: ComponentFixture<InscriptionMenageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionMenageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionMenageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
