const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  description = "";
  completeIn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.description = desc;
    this.completeIn = null;
  }
}

module.exports = Task;
