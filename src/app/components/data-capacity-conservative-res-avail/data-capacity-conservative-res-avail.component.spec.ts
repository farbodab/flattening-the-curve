import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCapacityConservativeResAvailComponent } from './data-capacity-conservative-res-avail.component';

describe('DataCapacityConservativeResAvailComponent', () => {
  let component: DataCapacityConservativeResAvailComponent;
  let fixture: ComponentFixture<DataCapacityConservativeResAvailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCapacityConservativeResAvailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCapacityConservativeResAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
