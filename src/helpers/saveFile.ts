import fs from "fs";
import type { Task } from "../models/task.ts";

const file = `./src/db/data.json`;

export const saveDB = (data: Task[]) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

export const readDB = () => {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, { encoding: "utf-8" });
  const data = JSON.parse(info) as Task[];

  return data;
};
