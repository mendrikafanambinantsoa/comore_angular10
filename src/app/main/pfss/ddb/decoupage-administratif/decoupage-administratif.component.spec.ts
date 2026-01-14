import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoupageAdministratifComponent } from './decoupage-administratif.component';

describe('DecoupageAdministratifComponent', () => {
  let component: DecoupageAdministratifComponent;
  let fixture: ComponentFixture<DecoupageAdministratifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoupageAdministratifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoupageAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
