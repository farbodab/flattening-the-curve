import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumCasesTimeGraphComponent } from './num-cases-time-graph.component';

describe('NumCasesTimeGraphComponent', () => {
  let component: NumCasesTimeGraphComponent;
  let fixture: ComponentFixture<NumCasesTimeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumCasesTimeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumCasesTimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
