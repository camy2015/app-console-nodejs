import colors from "colors";
import { checkbox, confirm, input, select } from "@inquirer/prompts";
import type { Task } from "../models/task.ts";

const questions = {
  message: "What do you want to do?",
  choices: [
    { value: "1", name: `${colors.green("1.")} Create task` },
    { value: "2", name: `${colors.green("2.")} List tasks` },
    { value: "3", name: `${colors.green("3.")} List completed tasks` },
    { value: "4", name: `${colors.green("4.")} List pending tasks` },
    { value: "5", name: `${colors.green("5.")} Completing tasks` },
    { value: "6", name: `${colors.green("6.")} Delete task` },
    { value: "0", name: `${colors.green("0.")} Log off` },
  ],
};

const inquirerMenu = async () => {
  console.clear();
  console.log(colors.green("================="));
  console.log(colors.white(" Select an option"));
  console.log(colors.green("=================\n"));

  const option = await select(questions);
  return option;
};

const pause = async () => {
  const question = {
    message: `Press ${colors.green("ENTER")} for continue`,
  };

  console.log("\n");
  await input(question);
};

const readInput = async (message: string) => {
  const question = {
    message,
    validate(value: string | any[]) {
      if (value.length === 0) {
        return "Please enter a value";
      }
      return true;
    },
  };

  const desc = await input(question);
  return desc;
};

const confirmCreateTask = async (message: string) => {
  const question = {
    message,
  };

  const ok = await confirm(question);
  return ok;
};

const listTasksDelete = async (tasks: Task[] = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
    };
  });

  choices.unshift({
    value: "0",
    name: colors.green("0. ") + "Cancel",
  });

  const questions = {
    message: "Delete",
    choices,
  };

  const id = await select(questions);
  return id;
};

const confirmDelete = async (message: string) => {
  const question = {
    message,
  };

  const ok = confirm(question);
  return ok;
};

const showListCheckList = async (tasks: Task[] = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completeIn ? true : false,
    };
  });

  const question = {
    message: "Select",
    choices,
  };

  const ids = await checkbox(question);
  return ids;
};

export {
  inquirerMenu,
  pause,
  readInput,
  confirmCreateTask,
  listTasksDelete,
  confirmDelete,
  showListCheckList,
};
