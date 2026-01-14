import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageInscritTmsComponent } from './menage-inscrit-tms.component';

describe('MenageInscritTmsComponent', () => {
  let component: MenageInscritTmsComponent;
  let fixture: ComponentFixture<MenageInscritTmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageInscritTmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageInscritTmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
