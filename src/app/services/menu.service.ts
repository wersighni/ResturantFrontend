import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Menu } from '../class/menu';
import { Dish } from '../class/dish';
import { Category } from '../class/category';
import { Order } from '../class/Order';
import { DeliveryOrder } from '../class/DeliveryOrder';
import { Table } from '../class/Table';
import { BookTable } from '../class/BookTable';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = environment.urlBack;
  private token: any;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json' // Ajout de l'en-tête Content-Type
    });
  }

  createRecommendation( recommendation:Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl + '/menu/recommendation/',recommendation, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  createDeliveryOder( delivery:DeliveryOrder): Observable<DeliveryOrder> {
    return this.http.post<DeliveryOrder>(this.apiUrl + '/menu/delivery/',delivery, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  createTable( table:Table): Observable<Table> {
    return this.http.post<Table>(this.apiUrl + '/menu/tables/',table, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  BookTable( bookTable:BookTable): Observable<Table> {
    return this.http.post<Table>(this.apiUrl + '/menu/tables/bookTable',bookTable, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  getAllReservationTablesAdmin( ): Observable<BookTable[]> {
    return this.http.get<BookTable[]>(this.apiUrl + '/menu/tables/bookTable', { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
    getAllReservationTablesClients(userId:string ): Observable<BookTable[]> {
    return this.http.get<BookTable[]>(this.apiUrl + `/menu/tables/bookTable/${userId}`, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  deleteTable(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/menu/tables/${id}`, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error deleting the dish:', error);
        return throwError('Something went wrong while deleting the dish. Please try again later.');
      })
    );
  }
  getAllTables( ): Observable<Table[]> {
    return this.http.get<Table[]>(this.apiUrl + '/menu/tables/').pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  deleteOrder(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/menu/recommendation/${id}`, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error deleting the dish:', error);
        return throwError('Something went wrong while deleting the dish. Please try again later.');
      })
    );
  }
  getAllRecommendation(userId:string ): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + `/menu/recommendation/${userId}`, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  getAllDeliveryByUserId(userId:string ): Observable<DeliveryOrder[]> {
    return this.http.get<DeliveryOrder[]>(this.apiUrl + `/menu/delivery/${userId}`, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  getAllDelivery( ): Observable<DeliveryOrder[]> {
    return this.http.get<DeliveryOrder[]>(this.apiUrl + `/menu/delivery/`, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      }))
  }
  createDish( dish:Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl + '/menu/dish/',dish, { headers: this.headers })
  }
  updateDish( dish:Dish): Observable<Dish> {
    return this.http.put<Dish>(this.apiUrl + '/menu/dish/',dish, { headers: this.headers })
  }
  getAllDish(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl + '/menu/dish/', { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      })
    );
  }
  getAMenu(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl + '/menu/',).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      })
    );
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl + '/menu/categories/', { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      })
    );
  }
  deleteDish(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/menu/dish/${id}`, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error deleting the dish:', error);
        return throwError('Something went wrong while deleting the dish. Please try again later.');
      })
    );
  }
}
