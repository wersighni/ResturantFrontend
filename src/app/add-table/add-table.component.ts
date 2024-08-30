import { Component, Inject } from '@angular/core';
import { RecommendationModalComponent } from '../recommendation-modal/recommendation-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dish } from '../class/dish';
import { Order } from '../class/Order';
import { Table } from '../class/Table';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss']
})
export class AddTableComponent {

  tableForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tableForm = this.fb.group({
      tableNumber: [0, [Validators.required, Validators.min(1),this.nonNegativeValidator()]],
      capacity: [0, [Validators.required, Validators.min(1),this.nonNegativeValidator()]]
    });
  }
    nonNegativeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isNegative = control.value <= 0;
      return isNegative ? { 'nonNegative': { value: control.value } } : null;
    };
  }
  ngOnInit() {
    console.log(this.data.element)

    if (this.data && this.data.element) {
      console.log(this.data.element)
      this.tableForm.patchValue({
        tableNumber:this.data.element.tableNumber,
        capacity:this.data.element.capacity,
      })
      console.log(this.tableForm.value)

    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.tableForm.valid) {
      this.dialogRef.close(this.tableForm.value);
    }
  }

  // Méthode pratique pour accéder aux contrôles du formulaire dans le template
  get f() {
    return this.tableForm.controls;
  }
}