import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFicheProfilageOrientationComponent } from './import-fiche-profilage-orientation.component';

describe('ImportFicheProfilageOrientationComponent', () => {
  let component: ImportFicheProfilageOrientationComponent;
  let fixture: ComponentFixture<ImportFicheProfilageOrientationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportFicheProfilageOrientationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFicheProfilageOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
