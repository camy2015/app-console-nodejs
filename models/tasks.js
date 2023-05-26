const Task = require("./task");
require("colors");

class Tasks {
  _list = {};

  get listArray() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  loadTasksFromArray(tasks = []) {
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
      const state = completeIn ? "Complete".bgGreen : "Pending".bgRed;
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
            `${(counter + ".").green} ${description} :: ${completeIn.green}`
          );
        }
      } else {
        if (!completeIn) {
          counter += 1;
          console.log(
            `${(counter + ".").green} ${description} :: ${completeIn}`
          );
        }
      }
    });
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  toggleCompleteds(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completeIn) {
        task.completeIn = new Date().toISOString();
      }
    });

    this.listArray.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completeIn = null;
      }
    });
  }
}

module.exports = Tasks;
