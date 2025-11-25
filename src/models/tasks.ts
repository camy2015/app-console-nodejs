import { Task } from "./task.ts";
import colors from "colors";

interface TasksInterface {
  [key: string]: Task;
}

export class Tasks {
  _list: TasksInterface;

  get listArray() {
    const list: Task[] = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      if (task) {
        list.push(task);
      }
    });
    return list;
  }

  constructor() {
    this._list = {} as TasksInterface;
  }

  loadTasksFromArray(tasks: Task[] = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listComplete() {
    console.log();
    this.listArray.forEach((task, index) => {
      const indexAdd = `${index + 1}`.green;
      const { description, completeIn } = task;
      const state = completeIn
        ? colors.bgGreen("Complete")
        : colors.bgRed("Pending");
      console.log(`${indexAdd} ${description} :: ${state}`);
    });
  }

  listTasksPendingOrCompleted(completed = true) {
    console.log();
    let counter = 0;
    this.listArray.forEach((task) => {
      const { description, completeIn } = task;
      if (completed) {
        if (completeIn) {
          counter += 1;
          console.log(
            `${colors.green(
              counter.toString()
            )} ${description} :: ${colors.green(completeIn)}`
          );
        }
      } else {
        if (!completeIn) {
          counter += 1;
          console.log(
            `${colors.green(
              counter.toString()
            )} ${description} :: ${completeIn}`
          );
        }
      }
    });
  }

  deleteTask(id = "") {
    const idKey = id as keyof Task;
    if (this._list[idKey]) {
      delete this._list[idKey];
    }
  }

  toggleCompleteds(ids: string[] = []) {
    ids.forEach((id) => {
      const task = this._list[id as keyof Task] as unknown as Task;
      if (!task.completeIn) {
        task.completeIn = new Date().toISOString();
      }
    });

    this.listArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id]!.completeIn = null;
      }
    });
  }
}
