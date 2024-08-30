import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../class/user';
import { Role } from '../class/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registerForm!: FormGroup;
  user = new User();
  role = new Role();
  roles: Role[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: this.passwordsMatchValidator 
    });
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    } else {
      return null;
    }
  }



submited:boolean=false
  onSubmit() {
this.submited=true
    if (this.registerForm.valid) {
    this.role.id = 1;
    this.role.name = "Client";
    this.roles.push(this.role);
    this.user.firstname = this.registerForm.value.firstname;
    this.user.lastname = this.registerForm.value.lastname;
    this.user.email = this.registerForm.value.email;
    this.user.username = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    this.user.roles = this.roles;
    
    this.authService.register(this.user).subscribe(data => {
      if (data) {
        Swal.fire({
          text: 'Registration has been successfully done',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/login']);
      }
    });
    localStorage.clear();
  }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
