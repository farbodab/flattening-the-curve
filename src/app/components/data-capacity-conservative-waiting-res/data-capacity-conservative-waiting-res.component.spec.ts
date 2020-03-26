import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCapacityConservativeWaitingResComponent } from './data-capacity-conservative-waiting-res.component';

describe('DataCapacityConservativeWaitingResComponent', () => {
  let component: DataCapacityConservativeWaitingResComponent;
  let fixture: ComponentFixture<DataCapacityConservativeWaitingResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCapacityConservativeWaitingResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCapacityConservativeWaitingResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
