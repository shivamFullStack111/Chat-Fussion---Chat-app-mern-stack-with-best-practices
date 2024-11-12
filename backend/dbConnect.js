const mongoose = require("mongoose");

async function connectDb() {
  await mongoose
    .connect(
      "mongodb+srv://shivam111:shivam111@cluster0.rpeveqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/chat-fussion"
    )
    .then(() => {
      console.log("db connection established");
    })
    .catch((err) => console.log(err));
}

module.exports = connectDb;
