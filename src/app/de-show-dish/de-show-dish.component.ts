import { Component, Inject } from '@angular/core';
import { Order } from '../class/Order';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeliveryOrder } from '../class/DeliveryOrder';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-de-show-dish',
  templateUrl: './de-show-dish.component.html',
  styleUrls: ['./de-show-dish.component.scss']
})
export class DeShowDishComponent {
  orders:Order[]=[]
  userId:any

  delivery=new DeliveryOrder()
  constructor(
    private menuService: MenuService,
    public dialogRef: MatDialogRef<DeShowDishComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
   this.delivery=this.data.delivery
   this.userId=localStorage.getItem("userId")

   this.getAllOrders()

  }
  getAllOrders() {
    this.menuService.getAllRecommendation(this.delivery.userId).subscribe(data => {
      console.log(data);
      data.filter((order: Order) =>
  {      if(order.id){
       console.log(order.id)
       console.log(this.delivery.orderIds.includes(order?.id))

         if( this.delivery.orderIds.includes(order?.id))
          {
            this.orders.push(order)
          }

        }}
      
      );
    });
  }
  
}
