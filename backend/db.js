const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crudDB", (err) => {
  if (!err) {
    console.log("Database Connected successfully");
  } else {
    console.log("Err in connection" + err);
  }
});

module.exports = mongoose;
