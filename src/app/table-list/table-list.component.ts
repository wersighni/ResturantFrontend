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
import { Table } from '../class/Table';
import { BookTable } from '../class/BookTable';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {

  products: Table[] = [];
  imageMap: { [key: string]: string } = {};
  qrCodeData: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private dialog: MatDialog,
    private router: Router,

  ) {}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticatedUser(); 

   this.getTables()

  }

  getTables() {
    this.menuService.getAllTables().subscribe(data => {
      this.products = data;
      this.products.forEach(dish => {

        console.log(dish)
   
      });
    });
  }





  addToCart(table: Table) {
    if(this.isAuthenticated)
      { 
        const tableBook=new BookTable()
        tableBook.tableR=table
        tableBook.userId=localStorage.getItem("userId")||''
        tableBook.clientName=localStorage.getItem("fullname")||''
        console.log(tableBook)
        this.menuService.BookTable(tableBook).subscribe(data=>
          {
            console.log(data)
            if(data){
              Swal.fire({
                text: 'Table reservation was done successfully !',
                icon: 'success',
                confirmButtonText: 'OK'
              });  
              this.getTables()
            }
          }
        )
      }
      else{
        this.router.navigate(['/login']);

      }
  }

 
}
