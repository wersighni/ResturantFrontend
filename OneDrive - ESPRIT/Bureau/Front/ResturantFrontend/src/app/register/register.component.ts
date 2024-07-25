import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../class/user';
import { Role } from '../class/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstname!: string;
  lastname!: string;
  username!:string
  email!: string;
  password!: string;
  confirmPassword!: string;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registerForm!: FormGroup;
  user=new User()
  role=new Role()
  roles:Role[]=[]

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,


  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  
  OnInit(){
    
  }
  onSubmit() {
    this.role.id=1
    this.role.name="Client"
    this.roles.push(this.role)
    this.user.firstname=this.registerForm.value.firstname
    this.user.lastname=this.registerForm.value.lastname
    this.user.email=this.registerForm.value.email
    this.user.username=this.registerForm.value.email
    this.user.password=this.registerForm.value.password
    this.user.roles=this.roles
    console.log('user:', this.user);

    this.authService.register(this.user).subscribe(data=>
      {
        console.log(data)
        if(data){
          Swal.fire({
            text: 'Registration has been successfully done',
            icon: 'success',
            confirmButtonText: 'OK'
          }); 
              this.router.navigate(['/login']);
    
            
          
        }
      }
    )
    localStorage.clear()
    // this.authService
    //   .login(this.username, this.password)
    //   .then((success) => {
    //     if (success) {
    //       this.router.navigate(['/menu']);

    //     } 
    //   })
    //   .catch((error) => {
        
    //     console.error('Login error:', error);
      
    //     if (error.status === 401) {
    //       Swal.fire({
    //         title: 'Erreur!',
    //         text: 'Invalid Username or Password',
    //         icon: 'error',
    //         confirmButtonText: 'OK'
    //       }); 
    //     } else  if (error.status === 423) {
    //       Swal.fire({
    //         title: 'Erreur!',
    //         text: 'Your account has been temporarily blocked. Please try again later.',
    //         icon: 'error',
    //         confirmButtonText: 'OK'
    //       }); 
    //     }  {
    //       // Gérez d'autres types d'erreurs si nécessaire
    //     }
    //   });
      
  }

  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordConfirmVisibility(){
    this.showConfirmPassword = !this.showConfirmPassword;

  }
}


