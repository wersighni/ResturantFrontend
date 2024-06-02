import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuResturantComponent } from './menu-resturant.component';

describe('MenuResturantComponent', () => {
  let component: MenuResturantComponent;
  let fixture: ComponentFixture<MenuResturantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuResturantComponent]
    });
    fixture = TestBed.createComponent(MenuResturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
