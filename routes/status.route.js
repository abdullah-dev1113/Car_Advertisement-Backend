const statusController = require("../controllers/status.controller");

const express = require("express");
const statusRouter = express.Router();

statusRouter.get("/", statusController.getAll);
statusRouter.get("/:id", statusController.getById);
statusRouter.post("/create", statusController.createStatus);
statusRouter.put("/update/:id", statusController.updateStatus);
statusRouter.delete("/delete/:id", statusController.deleteStatus);

module.exports = statusRouter;