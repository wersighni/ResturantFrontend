import { GedService } from './../services/ged.service';
import { MenuService } from './../services/menu.service';
import { Dish } from './../class/dish';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  dish: any
  index: number = 0;
  dishList: Dish[] = [];
url:any
  constructor(private activatedRoute: ActivatedRoute, private menuService: MenuService, private gedService:GedService) {}

  addToCart() {
    alert("Added to the cart!");
    // this.cardService.addToCart(this.product);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.index = Number(params['id']);

      this.menuService.getAllDish().subscribe(
        data => {
          console.log(data);
          this.dishList = data;
          console.log(this.dishList);

          // Find the dish after the dishList is populated
          this.dish = this.dishList.find(dis => dis.id === this.index);
          if (this.dish.dishPhoto) {
            this.gedService.getInfoDoc(this.dish.dishPhoto).subscribe(infoData => {
              this.gedService.download(this.dish.dishPhoto).subscribe(blobData => {
                 this.url = URL.createObjectURL(blobData);
              });
            });
          }
          console.log(this.dish);
        },
        error => {
          console.error('Erreur lors de la récupération des plats:', error);
        }
      );
    });
  }
}
