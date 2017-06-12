import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteManagmentComponent } from './website-managment.component';

describe('DashboardBrowsersComponent', () => {
    let component: WebsiteManagmentComponent;
    let fixture: ComponentFixture<WebsiteManagmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WebsiteManagmentComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WebsiteManagmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
