const mongoose = require("mongoose");

async function connectDb() {
  await mongoose
    .connect("mongodb://localhost:27017/chatFussion")
    .then(() => {
      console.log("db connection established");
    })
    .catch((err) => console.log(err));
}

module.exports = connectDb;
