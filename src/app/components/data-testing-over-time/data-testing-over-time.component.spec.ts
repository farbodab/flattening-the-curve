import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTestingOverTimeComponent } from './data-testing-over-time.component';

describe('DataTestingOverTimeComponent', () => {
  let component: DataTestingOverTimeComponent;
  let fixture: ComponentFixture<DataTestingOverTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTestingOverTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTestingOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
