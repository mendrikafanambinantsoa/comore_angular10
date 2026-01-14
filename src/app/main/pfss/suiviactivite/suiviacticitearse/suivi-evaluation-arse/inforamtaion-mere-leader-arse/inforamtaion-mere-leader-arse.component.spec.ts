import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InforamtaionMereLeaderArseComponent } from './inforamtaion-mere-leader-arse.component';

describe('InforamtaionMereLeaderArseComponent', () => {
  let component: InforamtaionMereLeaderArseComponent;
  let fixture: ComponentFixture<InforamtaionMereLeaderArseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforamtaionMereLeaderArseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforamtaionMereLeaderArseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
