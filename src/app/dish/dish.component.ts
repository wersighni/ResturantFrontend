import { GedService } from './../services/ged.service';
import { Component } from '@angular/core';
import { Menu } from '../class/menu';
import { MenuService } from '../services/menu.service';
import { Dish } from '../class/dish';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { MatDialog } from "@angular/material/dialog";
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent {

  dataSource: Dish[] = [];
  imageMap: { [key: string]: string } = {};

  url: string = '../../assets/Images/Capri.jpg'; // Chemin d'accès à l'image
  constructor(private menuService: MenuService,private dialog: MatDialog,private gedService:GedService) { }

  ngOnInit(): void {
    this.getDish()

   
  }
  getDish() {
    this.menuService.getAllDish().subscribe(data => {
      console.log(data);
      this.dataSource = data;
      this.dataSource.forEach(dish => {
        if (dish.dishPhoto) {
          this.gedService.getInfoDoc(dish.dishPhoto).subscribe(infoData => {
            console.log(infoData);
            this.gedService.download(dish.dishPhoto).subscribe(blobData => {
              const url = URL.createObjectURL(blobData);
              this.imageMap[dish.dishPhoto] = url;
            });
          });
        }
      });
    });
  }

  createDish() {
    const dialogRef = this.dialog.open(AddDishComponent, {
      width: '40%', // Définissez la largeur de la boîte de dialogue

 

    });
    dialogRef.afterClosed().subscribe(dish => {
      console.log(dish)
    
          this. getDish()




    })
    console.log("Editing element:");
  }
  editElement(dish: Dish) {
    console.log("Editing dish:", dish);
    const dialogRef = this.dialog.open(AddDishComponent, {
      width: '40%',
      data: { element: dish }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Dish after editing:", result);
        this.getDish();  // Rafraîchit la liste des plats après l'édition
      }
    });
  }
  
  deleteElement(element: Dish) {
    console.log("Deleting element:", element);
    this.menuService.deleteDish(element.id).subscribe

    (data=>{
      if( data===true)
        {
          Swal.fire(' The dish has been successfully removed!', '', 'success');
          this.getDish()

        }
    })
  }
  toggleAvailability(element: Dish) {
    this.menuService.updateDish(element).subscribe(
      data=>{
        if(data){
          this.getDish()
        }
      }
    )
  }
getinfos(docId:string)
{
  console.log(docId)
  // this.gedService.getInfoDoc(docId).subscribe(data=>
  //   console.log(data)

  // )
  return docId
}
getImageUrl(docId: string): string {
  return this.imageMap[docId] || this.url;
}
}