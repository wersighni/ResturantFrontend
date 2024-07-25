import { Order } from '../class/Order';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  orders:Order[]=[]
  userId:any


  constructor(private authService: AuthService,

    private menuService:MenuService
  ) {
  }
  username: any;
  isAdmin: boolean = false;
  isClient: boolean = false;

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.username = localStorage.getItem("fullname");
    const roleString = localStorage.getItem("roles") || "";
    const roles = roleString ? roleString.split(',') : [];
    this.isAdmin = roles.includes("ADMIN");
    this.isClient = roles.includes("Client");
    console.log("isAdmin", this.isAdmin)
    console.log("isClient",this.isClient)

  

    this.isAuthenticated = this.authService.isAuthenticatedUser();  
    this.menuService.getAllRecommendation(this.userId).subscribe(data=>
      {
        console.log(data)
        this.orders=data
      }
)

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
