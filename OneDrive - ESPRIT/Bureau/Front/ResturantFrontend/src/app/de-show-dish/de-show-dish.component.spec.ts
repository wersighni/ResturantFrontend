import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeShowDishComponent } from './de-show-dish.component';

describe('DeShowDishComponent', () => {
  let component: DeShowDishComponent;
  let fixture: ComponentFixture<DeShowDishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeShowDishComponent]
    });
    fixture = TestBed.createComponent(DeShowDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
