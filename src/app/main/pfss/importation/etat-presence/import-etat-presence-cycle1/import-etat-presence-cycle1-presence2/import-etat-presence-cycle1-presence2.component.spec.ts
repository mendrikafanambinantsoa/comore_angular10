import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresenceCycle1Presence2Component } from './import-etat-presence-cycle1-presence2.component';

describe('ImportEtatPresenceCycle1Presence2Component', () => {
  let component: ImportEtatPresenceCycle1Presence2Component;
  let fixture: ComponentFixture<ImportEtatPresenceCycle1Presence2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresenceCycle1Presence2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresenceCycle1Presence2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
