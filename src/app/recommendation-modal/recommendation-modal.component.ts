import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Order } from '../class/Order';
import { Dish } from '../class/dish';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recommendation-modal',
  templateUrl: './recommendation-modal.component.html',
  styleUrls: ['./recommendation-modal.component.scss']
})
export class RecommendationModalComponent {
  orders: Order = {
    dish: new Dish,
  userId: '',
    price: 0,
    numberOfDishes: 0
  };
dish=new Dish()
userId:any
 
  constructor(
    public dialogRef: MatDialogRef<RecommendationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  this.dish=data.dish
  }

  ngOnInit() {
    this.updatePrice();
    this.orders.dish=this.dish
    this.userId=localStorage.getItem("userId")
    this.orders.userId=this.userId
    console.log('Recommendation ', this.orders);

  }

  updatePrice() {
    this.orders.price = this.orders.numberOfDishes * this.dish.price;
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.orders);
  }}