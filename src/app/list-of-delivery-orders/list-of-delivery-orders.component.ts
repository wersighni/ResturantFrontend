import { DeShowDishComponent } from './../de-show-dish/de-show-dish.component';
import { Component } from '@angular/core';
import { DeliveryOrder } from '../class/DeliveryOrder';
import { MenuService } from '../services/menu.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-of-delivery-orders',
  templateUrl: './list-of-delivery-orders.component.html',
  styleUrls: ['./list-of-delivery-orders.component.scss']
})
export class ListOfDeliveryOrdersComponent {
  dataSource: DeliveryOrder[] = [];
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
                this.getAllDeliveryOrderForAdmin()
              }
        if(this.isClient){
          this.getAllDeliveryOrderForClient()
        }      
  }
  getAllDeliveryOrderForClient()
  {
    this.userId=localStorage.getItem("userId")

  this.menuService.getAllDeliveryByUserId(this.userId).subscribe(data=>
    {
      console.log(data)
      this.dataSource=data
    }
  )
  }
  getAllDeliveryOrderForAdmin()
  {

  this.menuService.getAllDelivery().subscribe(data=>
    {
      console.log(data)
      this.dataSource=data
    }
  )
  }
  showDish(element:DeliveryOrder){
    const dialogRef = this.dialog.open(DeShowDishComponent, {
      width: '50%',
      data: {
        delivery: element
      },
    });
  
    dialogRef.afterClosed().subscribe(table => {
      console.log(table)
      
    
    })

  }
}
