import { Component, OnInit } from '@angular/core';
import { Dish } from '../class/dish';
import { MenuService } from '../services/menu.service';
import { GedService } from '../services/ged.service';
import { CartService } from '../cart.service';
import { AuthService } from '../services/auth.service';
import { RecommendationModalComponent } from '../recommendation-modal/recommendation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../class/Order';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  products: Dish[] = [];
  imageMap: { [key: string]: string } = {};
  qrCodeData: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private dialog: MatDialog,
    private router: Router,

    private gedService: GedService
  ) {}
   url = "http://localhost:4200";
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticatedUser(); 

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



  addToCart(dish: Dish) {
    if(this.isAuthenticated)
      {
        const dialogRef = this.dialog.open(RecommendationModalComponent, {
          width: '50%',
          data: {
            dish: dish
          },
        });
      
        dialogRef.afterClosed().subscribe(recommendation => {
          if(recommendation)
            {
              console.log('recommendation', recommendation);
              this.menuService.createRecommendation(recommendation).subscribe((data:Order)=>
  
                {
                  console.log(data)
                  Swal.fire({
                    text: 'Sucess order',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  });  
                  if(recommendation)
                    {
                      this.menuService.getAllRecommendation(data.userId).subscribe(data=>
  
                        console.log(data)
                      )
                    }
                  
                this.router.navigate(["/cart"])                }
              )
  
            }
        });
      }
      else{
        this.router.navigate(['/login']);

      }
  }

  generateQrCodeData() {
    const url="http://localhost:4200"
    this.qrCodeData = JSON.stringify(url);
  }
}
