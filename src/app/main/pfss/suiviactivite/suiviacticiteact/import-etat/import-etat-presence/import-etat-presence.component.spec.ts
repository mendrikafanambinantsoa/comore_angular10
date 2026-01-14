import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatPresenceComponent } from './import-etat-presence.component';

describe('ImportEtatPresenceComponent', () => {
  let component: ImportEtatPresenceComponent;
  let fixture: ComponentFixture<ImportEtatPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEtatPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
