import { Dish } from "./dish";

export interface Order {
    id?: number;
    dish: Dish;
    userId: string;
    price: number;
    numberOfDishes: number;
  }