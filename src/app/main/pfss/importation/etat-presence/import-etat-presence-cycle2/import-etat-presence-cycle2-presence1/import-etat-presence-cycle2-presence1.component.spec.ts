import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresenceCycle2Presence1Component } from './import-etat-presence-cycle2-presence1.component';

describe('ImportEtatPresenceCycle2Presence1Component', () => {
  let component: ImportEtatPresenceCycle2Presence1Component;
  let fixture: ComponentFixture<ImportEtatPresenceCycle2Presence1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresenceCycle2Presence1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresenceCycle2Presence1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
