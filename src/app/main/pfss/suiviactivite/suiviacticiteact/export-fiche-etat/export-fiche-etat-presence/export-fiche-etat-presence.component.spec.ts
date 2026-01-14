import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFicheEtatPresenceComponent } from './export-fiche-etat-presence.component';

describe('ExportFicheEtatPresenceComponent', () => {
  let component: ExportFicheEtatPresenceComponent;
  let fixture: ComponentFixture<ExportFicheEtatPresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportFicheEtatPresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFicheEtatPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
