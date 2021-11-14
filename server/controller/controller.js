var UserDB = require("../model/model");

//create and save new user

exports.create = (req, res) => {
  //validate request
  //body means access the all form data
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new user
  const user = new UserDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect("/add-user"); //after save data reidrect the add user form
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occur while creating a create operation",
      });
    });
};

//retrive and return all user / retrive and return single user
exports.find = (req, res) => {
  // if user want retrive the single data
  if (req.query.id) {
    const id = req.query.id;
    UserDB.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `Error retriving user with id ${id}` });
      });
  } else {
    // else  user want retrive the multiple all data
    UserDB.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occured while retriving user information",
        });
      });
  }
};
//update a new idenfitfy user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to Update can not be empty" });
  }
  //url paramter
  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

//delete a user with specfied user id in the request
exports.delete = (req, res) => {
  //url parameter
  const id = req.params.id;

  UserDB.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Could not delete user with id = ${id}` });
    });
};
