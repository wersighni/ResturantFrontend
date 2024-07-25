import { Component, Inject } from '@angular/core';
import { RecommendationModalComponent } from '../recommendation-modal/recommendation-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dish } from '../class/dish';
import { Order } from '../class/Order';
import { Table } from '../class/Table';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent {

  table: Table = {
    capacity: 0,
    tableNumber: 0,
    description: '',
    isAvailable:true,
    id: 0
  };
 
  constructor(
    public dialogRef: MatDialogRef<AddTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
   

  }

  

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.table);
  }}
