import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCapacityItalyWaitingResComponent } from './data-capacity-italy-waiting-res.component';

describe('DataCapacityItalyWaitingResComponent', () => {
  let component: DataCapacityItalyWaitingResComponent;
  let fixture: ComponentFixture<DataCapacityItalyWaitingResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCapacityItalyWaitingResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCapacityItalyWaitingResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
