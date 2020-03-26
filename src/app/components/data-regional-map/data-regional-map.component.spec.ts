import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRegionalMapComponent } from './data-regional-map.component';

describe('DataRegionalMapComponent', () => {
  let component: DataRegionalMapComponent;
  let fixture: ComponentFixture<DataRegionalMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRegionalMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRegionalMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
