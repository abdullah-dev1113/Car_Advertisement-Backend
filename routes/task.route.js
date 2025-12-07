const taskController = require("../controllers/tasks.controller");

const express = require("express");
const { authenticate } = require("../middleware/user.middleware");
const taskRouter = express.Router();

taskRouter.get("/", taskController.getAll);
taskRouter.get("/search" , taskController.search);
taskRouter.get("/:id", taskController.GetById);
taskRouter.post("/create", authenticate , taskController.create);
taskRouter.put("/update/:id", taskController.update);
taskRouter.delete("/delete/:id", taskController.deleteTask);
module.exports = taskRouter;