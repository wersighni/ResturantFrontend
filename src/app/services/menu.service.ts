import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Menu } from '../class/menu';
import { Dish } from '../class/dish';

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

  getMenuItems(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl + '/menu/', { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      })
    );
  }
  getAllDish(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl + '/menu/dish/', { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching menu items:', error);
        return throwError('Something went wrong while fetching menu items. Please try again later.');
      })
    );
  }
}
