const express = require("express");
const router = express.Router();

const ObjectId = require("mongoose").Types.ObjectId;

const Employee = require("../models/employee.js");

router.get("/", (req, res) => {
  Employee.find((err, doc) => {
    if (err) {
      console.log("Error in Get api" + err);
    } else {
      res.send(doc);
    }
  });
});

router.get("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in Get api" + err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send("No record found with id " + req.params.id);
  }
});

router.post("/", (req, res) => {
  let emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    dept: req.body.dept,
  });

  emp.save((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });
});

router.delete("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in delete api" + err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send("No record found with id " + req.params.id);
  }
});

router.put("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    let emp = {
      name: req.body.name,
      position: req.body.position,
      dept: req.body.dept,
    };

    Employee.findByIdAndUpdate(
      req.params.id,
      { $set: emp },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in Put api" + err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res.status(400).send("No record found with id " + req.params.id);
  }
});

module.exports = router;
