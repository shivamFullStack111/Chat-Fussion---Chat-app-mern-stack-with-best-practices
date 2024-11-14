const express = require("express");
const cors = require("cors");
const connectDb = require("./dbConnect");
const userRouter = require("./routes/userRoutes");

const http = require("http");
const { Server } = require("socket.io");
const { connectSocket } = require("./socketController");

require("dotenv").config();
const app = express();
const server = http.createServer(app);

connectSocket(server)
// Configure Cloudinary

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./uploads"));

// Routes
app.use(userRouter);

// Connect to database
connectDb();

// Start server
server.listen(8000, () => {
  console.log("Server running on port 8000");
});

// Export upload if needed in other files
// module.exports = { upload };
