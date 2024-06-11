import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../class/menu';

@Component({
  selector: 'app-menu-resturant',
  templateUrl: './menu-resturant.component.html',
  styleUrls: ['./menu-resturant.component.scss']
})
export class MenuResturantComponent {
  dataSource: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    // this.menuService.getMenuItems().subscribe(data => {
    //   console.log(data);
    //   this.dataSource = data; // Assign fetched data to the dataSource
    // });
  }

  editElement(element: Menu) {
    // Implement edit functionality
    console.log("Editing element:", element);
    // You can navigate to a form to edit the menu item
  }

  deleteElement(element: Menu) {
    // Implement delete functionality
    console.log("Deleting element:", element);
    // You can call a service method to delete the menu item
  }
}
