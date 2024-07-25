import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { MenuResturantComponent } from './menu-resturant/menu-resturant.component';
import { DishComponent } from './dish/dish.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { AddDishComponent } from './add-dish/add-dish.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { QRCodeModule } from 'angularx-qrcode';
import { MatBadgeModule } from '@angular/material/badge';
import { RecommendationModalComponent } from './recommendation-modal/recommendation-modal.component';
import { ListOfDeliveryOrdersComponent } from './list-of-delivery-orders/list-of-delivery-orders.component';
import { AddTableComponent } from './add-table/add-table.component';
import { TableListComponent } from './table-list/table-list.component';
import { DeShowDishComponent } from './de-show-dish/de-show-dish.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableReservationsComponent } from './table-reservations/table-reservations.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    CartComponent,
    DetailsComponent,
    LoginComponent,
    MenuResturantComponent,
    DishComponent,
    AddDishComponent,
    RecommendationModalComponent,
    ListOfDeliveryOrdersComponent,
    AddTableComponent,
    TableListComponent,
    DeShowDishComponent,
    RegisterComponent,
    TableReservationsComponent
  ],
  imports: [
    MatBadgeModule,
    MatIconModule,
    BrowserModule,
    QRCodeModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatTableModule ,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
      BrowserAnimationsModule,
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
