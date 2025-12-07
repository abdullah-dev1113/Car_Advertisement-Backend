// const priority = require("../controllers/Priority.controller");
const priorityController = require("../controllers/Priority.controller");

const express = require("express");
const priorityRouter = express.Router();

priorityRouter.get("/", priorityController.findPriority);
priorityRouter.get("/:id", priorityController.GetpriorityById);
priorityRouter.post("/create", priorityController.createPriority);
priorityRouter.put("/update/:id", priorityController.updatepriority);
priorityRouter.delete("/delete/:id", priorityController.deletepriority);
module.exports = priorityRouter;