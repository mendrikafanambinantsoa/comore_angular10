import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresenceCycle1Presence1Component } from './import-etat-presence-cycle1-presence1.component';

describe('ImportEtatPresenceCycle1Presence1Component', () => {
  let component: ImportEtatPresenceCycle1Presence1Component;
  let fixture: ComponentFixture<ImportEtatPresenceCycle1Presence1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresenceCycle1Presence1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresenceCycle1Presence1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
