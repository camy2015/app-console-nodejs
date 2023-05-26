require("colors");
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirmDelete,
  showListCheckList,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tasks = new Tasks();
  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Description: ");
        tasks.createTask(desc);
        break;

      case "2":
        tasks.listComplete();
        break;

      case "3":
        tasks.listTasksPendingOrCompleted(true);
        break;

      case "4":
        tasks.listTasksPendingOrCompleted(false);
        break;

      case "5":
        const ids = await showListCheckList(tasks.listArray);
        tasks.toggleCompleteds(ids);
        break;

      case "6":
        const id = await listTasksDelete(tasks.listArray);

        if (id !== "0") {
          const confirm = await confirmDelete("Are you sure?");
          if (confirm) {
            tasks.deleteTask(id);
            console.log("Delete task");
          }
        }
        break;
    }

    saveDB(tasks.listArray);

    await pause();
  } while (opt !== "0");
};

main();
