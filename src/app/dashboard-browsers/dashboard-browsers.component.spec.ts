import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBrowsersComponent } from './dashboard-browsers.component';

describe('DashboardBrowsersComponent', () => {
  let component: DashboardBrowsersComponent;
  let fixture: ComponentFixture<DashboardBrowsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBrowsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBrowsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
