// menu.ts
import { Dish } from './dish';

export class Menu {
  id!: number;
  name!: string;
  date!: Date;
  dishes!: Dish[];
}
