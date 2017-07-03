import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteManagmentAddComponent } from './website-managment-add.component';

describe('WebsiteManagmentAddComponent', () => {
    let component: WebsiteManagmentAddComponent;
    let fixture: ComponentFixture<WebsiteManagmentAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ WebsiteManagmentAddComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WebsiteManagmentAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
