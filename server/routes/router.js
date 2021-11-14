const express = require("express");
const route = express.Router();
const serivces = require("../services/render");

const controller = require("../controller/controller");
//index user  get

/**
 *@description Root Route
 *@method GET/
 */
route.get("/", serivces.homeRoutes);

//open the add user get
/**
 *@description for add user
 *@method GET/ add user
 */
route.get("/add-user", serivces.add_user);

//open the update user get
/**
 *@description for update user
 *@method GET/ update user
 */
route.get("/update-user", serivces.update_user);

//API
route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

//export the routed
module.exports = route;
