import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Menu } from '../class/menu';
import { AddTableComponent } from '../add-table/add-table.component';
import { MatDialog } from '@angular/material/dialog';
import { Table } from '../class/Table';
import Swal from 'sweetalert2';

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
  editElement(element: Table) {
    // Ouvre le modal pour éditer la table
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '50%',
      data: {
        element: element  // Passer l'élément à éditer au modal
      },
    });
  
    // S'exécute après la fermeture du modal
    dialogRef.afterClosed().subscribe(updatedTable => {
      if (updatedTable) {
        // Appeler le service pour mettre à jour la table
        this.menuService.createTable(updatedTable).subscribe(data => {
          if (data) {
            // Rafraîchir la liste des tables
            this.getAllTables();
            // Afficher un message de succès
            Swal.fire('The table was successfully updated!', '', 'success');
          }
        });
      }
    });
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
              Swal.fire(' The table was successfully added!', '', 'success');

            }
        }
      )
    })

  }
  deleteElement(element: Menu) {
    this.menuService.deleteTable(element.id).subscribe(data=>
      {
        Swal.fire(' The table was successfully deleted!', '', 'success');
        this.getAllTables()
      }
    )
    console.log("Deleting element:", element);
    // You can call a service method to delete the menu item
  }
}
