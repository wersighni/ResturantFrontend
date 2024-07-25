import { Component } from '@angular/core';
import { DeliveryOrder } from '../class/DeliveryOrder';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from '../services/menu.service';
import { BookTable } from '../class/BookTable';

@Component({
  selector: 'app-table-reservations',
  templateUrl: './table-reservations.component.html',
  styleUrls: ['./table-reservations.component.scss']
})
export class TableReservationsComponent {

  dataSource: BookTable[] = [];
  userId:any
  constructor(
    private dialog: MatDialog,
    private menuService:MenuService
  ) {
  }
  isAdmin: boolean = false;
  isClient: boolean = false;

  ngOnInit(): void {
    const roleString = localStorage.getItem("roles") || "";
    const roles = roleString ? roleString.split(',') : [];
    this.isAdmin = roles.includes("ADMIN");
    this.isClient = roles.includes("Client");
    console.log("isAdmin", this.isAdmin)
    console.log("isClient",this.isClient)

    if(this.isAdmin)
      {
                this.getAllReservationTablesAdmin()
              }
        if(this.isClient){
          this.getAllReservationTablesClient()
        }      
  }
  getAllReservationTablesClient()
  {
    this.userId=localStorage.getItem("userId")

  this.menuService.getAllReservationTablesClients(this.userId).subscribe(data=>
    {
      console.log(data)
      this.dataSource=data
    }
  )
  }
  getAllReservationTablesAdmin()
  {

  this.menuService.getAllReservationTablesAdmin().subscribe(data=>
    {
      console.log(data)
      this.dataSource=data
    }
  )
  }



}

