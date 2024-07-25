import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { MenuResturantComponent } from './menu-resturant/menu-resturant.component';
import { DishComponent } from './dish/dish.component';
import { ListOfDeliveryOrdersComponent } from './list-of-delivery-orders/list-of-delivery-orders.component';
import { TableListComponent } from './table-list/table-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/AuthGuard';
import { TableReservationsComponent } from './table-reservations/table-reservations.component';

const routes: Routes = [{
  path:"",component: HomeComponent
},{
  path:"about",component: AboutComponent
},
{
  path:"tabless",component: TableListComponent,canActivate: [AuthGuard]
},
{
  path:"tablesReservations",component: TableReservationsComponent,canActivate: [AuthGuard]
}
,
{
  path:"register",component: RegisterComponent
}
,{
  path:"login",component: LoginComponent
},
{
  path:"Delivery",component: ListOfDeliveryOrdersComponent,canActivate: [AuthGuard]
},
{
  path:"menu",component: MenuComponent
}
,{
  path:"tables",component: MenuResturantComponent,canActivate: [AuthGuard]
},
{
  path:"plat",component: DishComponent,canActivate: [AuthGuard]
},{
  path:"cart",component: CartComponent,canActivate: [AuthGuard]
},{
  path:"product/:id",component: DetailsComponent
}];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
