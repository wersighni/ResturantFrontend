import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: any;
  password: any;
  showPassword: boolean = false; // Ajout d'une variable pour afficher ou masquer le mot de passe
  constructor(
    private authService: AuthService,
    private router: Router,
   

  ) {}
  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    localStorage.clear()
    this.authService
      .login(this.username, this.password)
      .then((success) => {
        if (success) {
          this.router.navigate(['/']);

        } 
      })
      .catch((error) => {
        
        console.error('Login error:', error);
      
        if (error.status === 401) {
          Swal.fire({
            title: 'Erreur!',
            text: 'Invalid Username or Password',
            icon: 'error',
            confirmButtonText: 'OK'
          }); 
        } else  if (error.status === 423) {
          Swal.fire({
            title: 'Erreur!',
            text: 'Your account has been temporarily blocked. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          }); 
        }  {
          // Gérez d'autres types d'erreurs si nécessaire
        }
      });
      
  }

  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

