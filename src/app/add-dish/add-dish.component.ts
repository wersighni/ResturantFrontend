import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GedService } from '../services/ged.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private gedService: GedService, 
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<AddDishComponent>) {
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
element: Dish=new Dish()
ngOnInit(): void {
this.menuService.getAllCategories().subscribe(data=>

  this.categories=data  
  )
  if (this.data && this.data.element) {
    this.element = this.data.element;

    // Mise à jour des valeurs du formulaire
    this.dishForm.patchValue({
      name: this.element.name,
      description: this.element.description,
      price: this.element.price,
      category: this.element.category ? this.element.category.id : '',
      photo: this.element.dishPhoto
    });
  } else {
    console.error('No element data provided');
  }




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
   if(this.data && this.data.element){
      this.dish.id=this.element.id

    this.menuService.createDish(this.dish).subscribe(data=>

      {
        Swal.fire(' The dish was successfully updated!', '', 'success');
        this.dialogRef.close(this.dish)


      }
    )
   }else{
    this.menuService.createDish(this.dish).subscribe(data=>

      {
        Swal.fire(' The dish was successfully added!', '', 'success');
        this.dialogRef.close(this.dish)


      }
    )
   }

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
