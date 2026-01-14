import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeResultatPlainteComponent } from './type-resultat-plainte.component';

describe('TypeResultatPlainteComponent', () => {
  let component: TypeResultatPlainteComponent;
  let fixture: ComponentFixture<TypeResultatPlainteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeResultatPlainteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeResultatPlainteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
