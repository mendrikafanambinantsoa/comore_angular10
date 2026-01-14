import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenagePreselectionneTmsComponent } from './menage-preselectionne-tms.component';

describe('MenagePreselectionneTmsComponent', () => {
  let component: MenagePreselectionneTmsComponent;
  let fixture: ComponentFixture<MenagePreselectionneTmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenagePreselectionneTmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenagePreselectionneTmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
