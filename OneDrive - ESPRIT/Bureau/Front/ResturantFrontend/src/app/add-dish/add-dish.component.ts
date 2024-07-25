import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GedService } from '../services/ged.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Dish } from '../class/dish';
import { Menu } from '../class/menu';
import { MenuService } from '../services/menu.service';
import { Category } from '../class/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent {

  imageUrl: any;
  path = "photos;dish";
  dishForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private menuService:MenuService,
    private gedService: GedService, public dialogRef: MatDialogRef<AddDishComponent>) {
    this.dishForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],

      photo: ['', []]
    });
  }
dish:Dish=new Dish
docId:any
menu: Menu[]=[]
categories: Category[]=[]
ngOnInit(): void {
//   this.menuService.getMenuItems().subscribe(data=>
// this.menu=data
//   )
  this.menuService.getAllCategories().subscribe(data=>

this.categories=data  
)

}
selectedCategory:any

onCategorySelected(event: any) {
  this.selectedCategory = this.categories.find(category=>category.id==event.target.value)
 

  console.log("Selected Category:", this.selectedCategory);
}

closeModal(){
  this.dialogRef.close()

}
  addDish() {

    if (this.dishForm.valid) {
    this.dish.name=this.dishForm.value.name
    this.dish.description=this.dishForm.value.description
    this.dish.price=this.dishForm.value.price
    this.dish.dishPhoto=this.docId
    this.dish.category=this.selectedCategory
    console.log(this.dish)
    this.dialogRef.close(this.dish)
    this.menuService.createDish(this.dish).subscribe(data=>

      {
        Swal.fire(' The dish was successfully added!', '', 'success');


      }
    )

    } else {
      this.markFormGroupTouched(this.dishForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        console.log(file);
      };
      reader.readAsDataURL(file);

      console.log("Uploading file...");
      this.gedService.upload(file, this.path).subscribe((doc: any) => {
        if (doc.body) {
          this.docId=doc.body.id
          console.log("File uploaded successfully:", doc.body.id);
        }
      });
    }
  }
  openFileInput() {
    console.log("open")
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
}
