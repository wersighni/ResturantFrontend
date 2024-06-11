import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Menu } from '../class/menu';
import { Dish } from '../class/dish';
import { Category } from '../class/category';

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
