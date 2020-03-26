import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTestProportionByResultComponent } from './data-test-proportion-by-result.component';

describe('DataTestProportionByResultComponent', () => {
  let component: DataTestProportionByResultComponent;
  let fixture: ComponentFixture<DataTestProportionByResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTestProportionByResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTestProportionByResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
