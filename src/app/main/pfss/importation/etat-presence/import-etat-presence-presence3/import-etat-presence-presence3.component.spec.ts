import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresencePresence3Component } from './import-etat-presence-presence3.component';

describe('ImportEtatPresencePresence3Component', () => {
  let component: ImportEtatPresencePresence3Component;
  let fixture: ComponentFixture<ImportEtatPresencePresence3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresencePresence3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresencePresence3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
