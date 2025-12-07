const express = require("express");
const roleRouter = express.Router();
const rolecontroller = require("../controllers/Roles.controller");

roleRouter.get("/", rolecontroller.getAll);
roleRouter.get("/:id", rolecontroller.GetById);
roleRouter.post("/create", rolecontroller.CreateRole);
roleRouter.put("/update/:id", rolecontroller.UpdateRole);
roleRouter.delete("/delete/:id", rolecontroller.Deleted);

module.exports = roleRouter;
