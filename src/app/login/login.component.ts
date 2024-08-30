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
  registerForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
    

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
            text: 'Invalid Email or Password',
            icon: 'error',
            confirmButtonText: 'OK'
          }); 
        } else if (error.status === 423) {
          Swal.fire({
            title: 'Erreur!',
            text: 'Your account has been temporarily blocked. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          }); 
        }
      });
  }}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
