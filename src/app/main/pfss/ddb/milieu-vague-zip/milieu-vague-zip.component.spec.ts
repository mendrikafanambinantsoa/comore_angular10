import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilieuVagueZipComponent } from './milieu-vague-zip.component';

describe('MilieuVagueZipComponent', () => {
  let component: MilieuVagueZipComponent;
  let fixture: ComponentFixture<MilieuVagueZipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilieuVagueZipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilieuVagueZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
