import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIncomeComponent } from './dashboard-income.component';

describe('DashboardIncomeComponent', () => {
  let component: DashboardIncomeComponent;
  let fixture: ComponentFixture<DashboardIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
