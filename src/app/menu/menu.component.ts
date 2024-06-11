import { Component, OnInit } from '@angular/core';
import { Dish } from '../class/dish';
import { MenuService } from '../services/menu.service';
import { GedService } from '../services/ged.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  products: Dish[] = [];
  imageMap: { [key: string]: string } = {};
  qrCodeData: string = '';
 
  constructor(
    private cartService: CartService,
    private menuService: MenuService,
    private gedService: GedService
  ) {}
   url = "http://localhost:4200";
  ngOnInit(): void {
    this.getDish();
    this.qrCodeData = this.url;

  }

  getDish() {
    this.menuService.getAMenu().subscribe(data => {
      this.products = data;
      this.products.forEach(dish => {
        if (dish.dishPhoto) {
          this.gedService.getInfoDoc(dish.dishPhoto).subscribe(infoData => {
            this.gedService.download(dish.dishPhoto).subscribe(blobData => {
              const url = URL.createObjectURL(blobData);
              this.imageMap[dish.dishPhoto] = url;
            });
          });
        }
      });
    });
  }

  getImageUrl(dishPhoto: string): string {
    return this.imageMap[dishPhoto] || '../../assets/Images/Capri.jpg';
  }

  addToCart(obj: Dish) {
    alert("Added to the cart!");
    // this.cartService.addToCart(obj);
  }

  generateQrCodeData() {
    const url="http://localhost:4200"
    this.qrCodeData = JSON.stringify(url);
  }
}
