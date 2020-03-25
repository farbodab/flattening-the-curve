import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumCasesTotalGraphComponent } from './num-cases-total-graph.component';

describe('NumCasesTotalGraphComponent', () => {
  let component: NumCasesTotalGraphComponent;
  let fixture: ComponentFixture<NumCasesTotalGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumCasesTotalGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumCasesTotalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
