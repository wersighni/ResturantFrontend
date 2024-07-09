import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../class/menu';
import { AddTableComponent } from '../add-table/add-table.component';
import { MatDialog } from '@angular/material/dialog';
import { Table } from '../class/Table';

@Component({
  selector: 'app-menu-resturant',
  templateUrl: './menu-resturant.component.html',
  styleUrls: ['./menu-resturant.component.scss']
})
export class MenuResturantComponent {
  dataSource: Table[] = [];

  constructor(private menuService: MenuService,    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  this.getAllTables()
  }

  getAllTables()
  {
    this.menuService.getAllTables().subscribe(data => {
      console.log(data);
      this.dataSource = data; // Assign fetched data to the dataSource
    });
  }
  editElement(element: Menu) {
    // Implement edit functionality
    console.log("Editing element:", element);
    // You can navigate to a form to edit the menu item
  }
  createtable(){
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '50%',
      data: {
        dish: null
      },
    });
  
    dialogRef.afterClosed().subscribe(table => {
      console.log(table)
      this.menuService.createTable(table).subscribe(data=>
        {
          if(data)
            {
              this.getAllTables()

            }
        }
      )
    })

  }
  deleteElement(element: Menu) {
    // Implement delete functionality
    console.log("Deleting element:", element);
    // You can call a service method to delete the menu item
  }
}
