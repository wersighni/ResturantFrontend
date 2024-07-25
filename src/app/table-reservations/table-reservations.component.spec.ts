import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReservationsComponent } from './table-reservations.component';

describe('TableReservationsComponent', () => {
  let component: TableReservationsComponent;
  let fixture: ComponentFixture<TableReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableReservationsComponent]
    });
    fixture = TestBed.createComponent(TableReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
