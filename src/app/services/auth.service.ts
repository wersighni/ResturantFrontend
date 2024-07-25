import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBack = environment.urlBack;
  private loginUrl = this.urlBack + '/keycloak/auth/login';
  userSkills: string[] = [];
  skillsToLearn: string[] = [];
  recommendedCourses: any[] = [];


  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) {}

  private isAuthenticated = new BehaviorSubject<boolean>(this.isAuthenticatedUser());

  get isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  register(user:User): Observable<any> {
    return this.http.post<Observable<any>>(this.urlBack + '/keycloak/auth/register',  user );
  }
  login(username: string, password: string): Promise<boolean> {
    return this.http.post(this.loginUrl, { username, password }).toPromise().then((response: any) => {
      const accessToken = response.access_token;

      if (this.jwtHelper.isTokenExpired(accessToken)) {
        console.error('Token JWT expiré');
        return false;
      }

      const decodedToken = this.jwtHelper.decodeToken(accessToken);
      const usernameFromToken = decodedToken.preferred_username;
      const userIdFromToken = decodedToken.sub;
      const roleFromToken = decodedToken.realm_access.roles;
      
       
      const firstname=  decodedToken.given_name;
      const lastname=  decodedToken.family_name;
      localStorage.setItem('fullname', firstname+ " "+lastname);

      localStorage.setItem('token', accessToken);
      localStorage.setItem('userId', userIdFromToken);
      localStorage.setItem('username', usernameFromToken);
      localStorage.setItem('roles', roleFromToken);
      this.isAuthenticated.next(true);

      return true;
    });
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    localStorage.removeItem('memberId');
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }


}
