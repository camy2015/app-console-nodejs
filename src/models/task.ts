import { v4 as uuidv4 } from "uuid";

export class Task {
  id: string = "";
  description: string = "";
  completeIn: string | null = null;

  constructor(desc: string) {
    this.id = uuidv4();
    this.description = desc;
    this.completeIn = null;
  }
}
