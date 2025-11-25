import colors from "colors";
import {
  confirmCreateTask,
  pause,
  showListCheckList,
  listTasksDelete,
  confirmDelete,
  inquirerMenu,
  readInput,
} from "./helpers/inquirer.ts";
import { saveDB, readDB } from "./helpers/saveFile.ts";
import { Tasks } from "./models/tasks.ts";

process.on("uncaughtException", (error: { name: string }) => {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("👋 until next time!");
  } else {
    // Rethrow unknown errors
    throw error;
  }
});

const main = async () => {
  let opt: string;
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
        const confirm = await confirmCreateTask("Are you sure?");
        if (confirm) {
          tasks.createTask(desc);
          console.log(colors.bgGreen(`Created Task ${desc}`));
        }
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
            console.log(colors.bgRed(`Deleted Task with id ${id}`));
          }
        }
        break;
    }

    saveDB(tasks.listArray);

    await pause();
  } while (opt !== "0");
};

main();
