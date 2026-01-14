import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRecepteurComponent } from './info-recepteur.component';

describe('InfoRecepteurComponent', () => {
  let component: InfoRecepteurComponent;
  let fixture: ComponentFixture<InfoRecepteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRecepteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRecepteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
