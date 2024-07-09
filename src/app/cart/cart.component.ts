import { MenuService } from './../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { IProducts } from '../Iproducts';
import { CartService } from '../cart.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Order } from '../class/Order';
import { DeliveryOrder } from '../class/DeliveryOrder';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: IProducts[] = [];
  subtotal:number =0;
  vat:number =0;
  discount:number =0;
  total:number =0;
  orders:Order[]=[]
  userId:any
  orderIds: number[]=[];
  constructor(private menuService: MenuService){}

  deliveryOrder=new DeliveryOrder()
  orderForm=new FormGroup({
    name: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required)
  });
  OnSubmit(){
    if(this.orderForm.valid && this.orders.length!=0 ){
      this.deliveryOrder.userId=this.userId
      this.deliveryOrder.name = this.orderForm.value.name || '';  
      this.deliveryOrder.phoneNumber = Number(this.orderForm.value.phoneNumber) ;

      this.deliveryOrder.address = this.orderForm.value.address || '';
      this.deliveryOrder.total=this.total
      this.deliveryOrder.orderIds = this.orders
      .filter(order => order.id !== undefined)
      .map(order => order.id!);  


     
      console.log(this.deliveryOrder);
      this.menuService.createDeliveryOder(this.deliveryOrder).subscribe(
        (data)=>
          {
            Swal.fire({
              text: 'Sucess order',
              icon: 'success',
              confirmButtonText: 'OK'
            });           }
      )
    }
    if(this.orders.length==0)
      {
        Swal.fire({
          text: 'You must have a list of orders to delivery',
          icon: 'error',
          confirmButtonText: 'OK'
        });       }
  }
  deleteOder(order:Order)
  {

if(order.id)    {
  this.menuService.deleteOrder(order.id).subscribe(data=>{
    this.getAllOders()

  })}}


  ngOnInit(): void {
    this.userId=localStorage.getItem("userId")

    this.getAllOders()
   
      

    }
    getAllOders()
    {
      
    this.menuService.getAllRecommendation(this.userId).subscribe(data=>
      {
        console.log(data)
        this.orders=data
        this.total = 0;

        this.calculateTotal();
      })
    }
    calculateTotal() {
      console.log(this.orders)
      this.total = this.orders.reduce((sum: number, order: Order) => {
        return sum + order.price;
      }, 0);
      console.log(this.total)
    }
}
