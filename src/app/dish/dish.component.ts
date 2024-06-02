import { Component } from '@angular/core';
import { Menu } from '../class/menu';
import { MenuService } from '../services/menu.service';
import { Dish } from '../class/dish';
@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent {

  dataSource: Dish[] = [];
  url: string = '../../assets/Images/Capri.jpg'; // Chemin d'accès à l'image
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    
    this.menuService.getAllDish().subscribe(data => {
      console.log(data);
      this.dataSource = data; 
    });
  }

  editElement(element: Menu) {
    console.log("Editing element:", element);
  }

  deleteElement(element: Menu) {
    console.log("Deleting element:", element);
  }
}