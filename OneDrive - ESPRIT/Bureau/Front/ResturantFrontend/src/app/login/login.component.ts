import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: any;
  password: any;
  registerForm!: FormGroup;

  showPassword: boolean = false; // Ajout d'une variable pour afficher ou masquer le mot de passe
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,


  ) {
    this.registerForm = this.fb.group({
     
      username: ['', Validators.required],
      password: ['', Validators.required],
   
    });
  }
  onSubmit() {
    console.log('Username:', this.registerForm.value.username);
    console.log('Password:', this.registerForm.value.password);
    localStorage.clear()
    this.authService
      .login(this.registerForm.value.username, this.registerForm.value.password)
      .then((success) => {
        if (success) {
          this.router.navigate(['/menu']);

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

