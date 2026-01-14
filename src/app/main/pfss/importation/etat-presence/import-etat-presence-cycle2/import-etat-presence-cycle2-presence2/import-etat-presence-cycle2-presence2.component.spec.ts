import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresenceCycle2Presence2Component } from './import-etat-presence-cycle2-presence2.component';

describe('ImportEtatPresenceCycle2Presence2Component', () => {
  let component: ImportEtatPresenceCycle2Presence2Component;
  let fixture: ComponentFixture<ImportEtatPresenceCycle2Presence2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresenceCycle2Presence2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresenceCycle2Presence2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
