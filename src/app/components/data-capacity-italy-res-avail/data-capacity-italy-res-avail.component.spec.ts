import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCapacityItalyResAvailComponent } from './data-capacity-italy-res-avail.component';

describe('DataCapacityItalyResAvailComponent', () => {
  let component: DataCapacityItalyResAvailComponent;
  let fixture: ComponentFixture<DataCapacityItalyResAvailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCapacityItalyResAvailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCapacityItalyResAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
