import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeActiviteArseActComponent } from './type-activite-arse-act.component';

describe('TypeActiviteArseActComponent', () => {
  let component: TypeActiviteArseActComponent;
  let fixture: ComponentFixture<TypeActiviteArseActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeActiviteArseActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeActiviteArseActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
