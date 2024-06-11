import { Category } from "./category";

// dish.ts
export class Dish {
    id!: number;
    name!: string;
    dishPhoto!: string;
    description!: string;
    category!:Category
    price!: number;
    isAvailable!: boolean;
  }
  