import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenageInscritArseComponent } from './menage-inscrit-arse.component';

describe('MenageInscritArseComponent', () => {
  let component: MenageInscritArseComponent;
  let fixture: ComponentFixture<MenageInscritArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenageInscritArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenageInscritArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
