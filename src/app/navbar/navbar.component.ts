import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticatedUser();  // Supposons que le service d'authentification ait cette méthode


  }

  selectedOption: string = ''; // Variable pour stocker l'option sélectionnée

  options: string[] = ['Option 1', 'Option 2', 'Option 3']; // Options du menu déroulant
  onSelect(option: string): void {
    this.selectedOption = option;
  }
  logout(): void {
    this.authService.logout()
    console.log("hello")

    this.isAuthenticated = false;

  }

}
