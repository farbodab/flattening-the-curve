import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGraphOntComponent } from './home-graph-ont.component';

describe('HomeGraphOntComponent', () => {
  let component: HomeGraphOntComponent;
  let fixture: ComponentFixture<HomeGraphOntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGraphOntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGraphOntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
