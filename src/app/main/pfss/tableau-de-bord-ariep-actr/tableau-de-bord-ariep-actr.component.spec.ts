import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauDeBordAriepActrComponent } from './tableau-de-bord-ariep-actr.component';

describe('TableauDeBordAriepActrComponent', () => {
  let component: TableauDeBordAriepActrComponent;
  let fixture: ComponentFixture<TableauDeBordAriepActrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauDeBordAriepActrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauDeBordAriepActrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
