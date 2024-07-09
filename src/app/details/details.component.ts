import { GedService } from './../services/ged.service';
import { MenuService } from './../services/menu.service';
import { Dish } from './../class/dish';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecommendationModalComponent } from '../recommendation-modal/recommendation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../class/Order';
import { AuthService } from '../services/auth.service';

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
isAuthenticated: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,

    private router: Router,
        private menuService: MenuService,
     private gedService:GedService) {}
     ngOnInit(): void {
      this.isAuthenticated = this.authService.isAuthenticatedUser(); 

      this.activatedRoute.params.subscribe((params: any) => {
        this.index = Number(params['id']);
  
        this.menuService.getAllDish().subscribe(
          data => {
            console.log(data);
            this.dishList = data;
            console.log(this.dishList);
  
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
     addToCart() {
      if(this.isAuthenticated)
        {
      const dialogRef = this.dialog.open(RecommendationModalComponent, {
        width: '50%',
        data: {
          dish: this.dish
        },
      });
    
      dialogRef.afterClosed().subscribe(recommendation => {
        if(recommendation)
          {
            console.log('recommendation', recommendation);
            this.menuService.createRecommendation(recommendation).subscribe((data:Order)=>

              {
                if(recommendation)
                  {
                    this.menuService.getAllRecommendation(data.userId).subscribe(data=>

                      console.log(data)
                    )
                  }
                console.log(data)
              }
            )

          }
          
          
      });
    }
    else{
      this.router.navigate(['/login']);

    }
  }
    

  
}
