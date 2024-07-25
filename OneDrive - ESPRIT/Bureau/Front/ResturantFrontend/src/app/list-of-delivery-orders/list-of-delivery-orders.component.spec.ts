import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDeliveryOrdersComponent } from './list-of-delivery-orders.component';

describe('ListOfDeliveryOrdersComponent', () => {
  let component: ListOfDeliveryOrdersComponent;
  let fixture: ComponentFixture<ListOfDeliveryOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfDeliveryOrdersComponent]
    });
    fixture = TestBed.createComponent(ListOfDeliveryOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
