const express = require("express");
const cors = require("cors");
const connectDb = require("./dbConnect");
const Users = require("./schemas/userSchema");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./uploads"));

app.use(userRouter)
connectDb();

app.listen(8000, () => {
  console.log("port running on 8000");
});
