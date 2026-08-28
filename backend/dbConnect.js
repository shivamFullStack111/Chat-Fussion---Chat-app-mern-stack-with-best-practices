const mongoose = require("mongoose");
const { config } = require("./config/config");

async function connectDb() {
  await mongoose
    .connect(
     config?.MONGO_URL
    )
    .then(() => {
      console.log("db connection established");
    })
    .catch((err) => console.log(err));
}

module.exports = connectDb;
